exports.index = (req, res, next) => {
  res.status(200).json({
    data: [
      {
        id: "1",
        name: "Inter vision",
        address: {
          province: "Bangkok",
          postcode: "10260",
        },
      },
      {
        id: "2",
        name: "CYW",
        address: {
          province: "nakornpatom",
          postcode: "73110",
        },
      },
    ],
  });
};
