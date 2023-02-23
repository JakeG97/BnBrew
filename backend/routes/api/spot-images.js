const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { SpotImage } = require('../../db/models');
const router = express.Router();

// delete a spot image

router.delete("/:imageId", requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const findImage = await SpotImage.findByPk(imageId);
  
    if (!findImage) {
      res.status(404);
      return res.json({
        message: "Spot Image couldn't be found",
        statusCode: 404,
      });
    }
  
    await findImage.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  });


module.exports = router;