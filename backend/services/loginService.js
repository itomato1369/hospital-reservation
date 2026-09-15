const bcrypt = require("bcryptjs");
const loginMapper = require("../mappers/loginMapper.js");
// JWT　サーバーが発行する身分証明書
const jwt = require("jsonwebtoken");

const getAccessSecret = () => process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const getRefreshSecret = () => process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

const createTokenPayload = (user, userType) => {
    if (userType === "patient") {
        return {
            userType: "patient",
            loginId: user.login_id,
            patientId: user.patient_id,
            role: user.role,
            name: user.name,
        };
    }

    return {
        userType: "staff",
        loginId: user.login_id,
        staffId: user.staff_id,
        role: user.role,
        name: user.name,
    };
};

const createAuthResponse = (user, userType, accessToken, refreshToken) => {
    const tokenPayload = createTokenPayload(user, userType);

    if (userType === "patient") {
        return {
            token: accessToken,
            accessToken,
            refreshToken,
            userType: "patient",
            loginId: user.login_id,
            patientId: user.patient_id,
            name: user.name,
        };
    }

    return {
        token: accessToken,
        accessToken,
        refreshToken,
        userType: "staff",
        loginId: user.login_id,
        staffId: user.staff_id,
        name: user.name,
        role: user.role,
    };
};

const login = async (loginId, password) => {
    // 患者を検索
    let result = await loginMapper.selectPatinetByLoginId(loginId);

    if (result.length > 0) {
        const patient = result[0];
        const ok = await bcrypt.compare(password, patient.password);

        if (!ok) {
            throw new Error("IDまたはパスワードが違います");
        }

        const payload = createTokenPayload(patient, "patient");
        const accessToken = jwt.sign(payload, getAccessSecret(), {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign(
            {
                ...payload,
                type: "refresh",
            },
            getRefreshSecret(),
            {
                expiresIn: "7d",
            }
        );

        return createAuthResponse(patient, "patient", accessToken, refreshToken);
    }

    result = await loginMapper.selectStaffByLoginId(loginId);

    if (result.length > 0) {
        const staff = result[0];
        const ok = await bcrypt.compare(password, staff.password);

        if (!ok) {
            throw new Error("IDまたはパスワードが違います");
        }

        const payload = createTokenPayload(staff, "staff");
        const accessToken = jwt.sign(payload, getAccessSecret(), {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign(
            {
                ...payload,
                type: "refresh",
            },
            getRefreshSecret(),
            {
                expiresIn: "7d",
            }
        );

        return createAuthResponse(staff, "staff", accessToken, refreshToken);
    }

    throw new Error("IDまたはパスワードが違います");
};

const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error("リフレッシュトークンがありません");
    }

    let decoded;

    try {
        decoded = jwt.verify(refreshToken, getRefreshSecret());
    } catch (error) {
        throw new Error("無効なリフレッシュトークンです");
    }

    const { userType, loginId, patientId, staffId, role, name } = decoded;

    const payload = {
        userType,
        loginId,
        ...(userType === "patient" ? { patientId } : { staffId }),
        role,
        name,
    };

    const accessToken = jwt.sign(payload, getAccessSecret(), {
        expiresIn: "15m",
    });

    return {
        token: accessToken,
        accessToken,
        refreshToken,
        userType,
        loginId,
        ...(userType === "patient" ? { patientId } : { staffId, role }),
        name,
        role,
    };
};

module.exports = {
    login,
    refreshAccessToken,
};