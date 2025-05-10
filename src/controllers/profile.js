import models from "../models/index.js";

const updateName = async (req, res) => {
  const { profileId } = req.params;
  const { firstname, lastname } = req.body;

  try {
    const profile = await models.Profile.updateName(
      profileId,
      firstname,
      lastname
    );
    const updated = {
      firstname: profile.firstname,
      lastname: profile.lastname,
    };

    return res.json({ updated });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating name",
      error: err,
    });
  }
};

export default updateName;
