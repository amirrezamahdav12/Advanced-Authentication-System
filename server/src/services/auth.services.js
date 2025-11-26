const { sql } = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

class AuthService {
  async register(email, password) {
    const hashed = await hashPassword(password);

    const result = await sql.query`
      INSERT INTO Users (email, passwordHash)
      VALUES (${email}, ${hashed});
    `;

    return { message: "User registered" };
  }

  async login(email, password) {
    const user = (
      await sql.query`
        SELECT * FROM Users WHERE email = ${email};
      `
    ).recordset[0];

    if (!user) throw new Error("User not found");

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) throw new Error("Invalid password");

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    await sql.query`
      INSERT INTO RefreshTokens (userId, token)
      VALUES (${user.id}, ${refreshToken});
    `;

    return { accessToken, refreshToken };
  }

  async refresh(oldToken) {
    const tokenRecord = (
      await sql.query`
        SELECT * FROM RefreshTokens WHERE token = ${oldToken} AND isValid = 1;
      `
    ).recordset[0];

    if (!tokenRecord) throw new Error("Invalid refresh token");

    // invalidate old token
    await sql.query`
      UPDATE RefreshTokens SET isValid = 0 WHERE token = ${oldToken}
    `;

    const newAccessToken = generateAccessToken({ id: tokenRecord.userId });
    const newRefreshToken = generateRefreshToken({ id: tokenRecord.userId });

    await sql.query`
      INSERT INTO RefreshTokens (userId, token)
      VALUES (${tokenRecord.userId}, ${newRefreshToken});
    `;

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}

module.exports = new AuthService();
