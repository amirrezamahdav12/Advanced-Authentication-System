const authService = require("../services/auth.services.js");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authService.register(email, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const tokens = await authService.login(email, password);
      res.json(tokens);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  refresh: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refresh(refreshToken);
      res.json(tokens);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
