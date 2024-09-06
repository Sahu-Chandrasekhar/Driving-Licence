const DlUser = require('../models/dluser.model');
const User = require('../models/user.model');


const DlUserInsert = async (req, res) => {
  try {
    const userId = req.body.Id;
    const { Name, Adhaar, Pan, Dl, Status } = req.body;

    const userDetailes = await User.findById(userId);

    if (!userDetailes) {
      return res.status(404).json({
        status: 404,
        message: "User details not found",
      });
    }

    const newDlUser = new DlUser({
      Name, Adhaar, Pan, Dl, Status
    });

    const DlUsers = await newDlUser.save();

    // Update profile with new Project
    await User.findByIdAndUpdate(
      userId,
      { $push: { dluser: DlUsers._id } },
      { new: true }
    );


    res.status(201).json({
      status: 201,
      message: 'Success',
      data: DlUsers,
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

const ReadDlUsers = async (req, res) => {
  try {
    const DlUserInsertData = await DlUser.find();

    if (DlUserInsertData.length === 0) {
      res.status(200).json({
        status: 200,
        message: 'Data not Found'
      });
    } else {
      res.status(201).json({
        status: 201,
        message: 'Success',
        data: DlUserInsertData
      });
    }
  } catch (error) {
    console.error('Error featching data:', error);
    res.status(500).send('Error fetching');
  }
}

// const getDlById = async (req, res) => {
//   try {
//     const DlUserId = req.body.Id;
//     const DlUserData = await DlUser.findById(DlUserId);

//     if (!DlUserData) {
//       return res.status(404).json({ message: 'DL user not found' });
//     }

//     res.status(200).json({
//       status: 200,
//       message: 'Success',
//       data: DlUserData
//     });
//   } catch (error) {
//     console.error('Error fetching DL user by ID:', error);
//     res.status(500).send('Error fetching DL user by ID');
//   }
// }


// const getDlById = async (req, res) => {
//   try {
//     const DlUserId = req.params.DlUserId;
//     const DlUserData = await DlUser.findById(DlUserId);

//     if (!DlUserData) {
//       return res.status(404).json({ message: 'DL user not found' });
//     }

//     res.status(200).json({
//       status: 200,
//       message: 'Success',
//       data: DlUserData
//     });
//   } catch (error) {
//     console.error('Error fetching DL user by ID:', error);
//     res.status(500).send('Error fetching DL user by ID');
//   }
// };


const getDlByUser = async (req, res) => {
  try {
    const UserId = req.body.UserId;
    const UserData = await User.findById(UserId).populate('dluser');

    if (!UserData) {
      return res.status(404).json({
        status: 404,
        message: 'DL user not found'
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: UserData.dluser
    });
  } catch (error) {
    console.error('Error fetching DL user by ID:', error);
    res.status(500).send('Error fetching DL user by ID');
  }
};


const updateDlStatus = async (req, res) => {
  try {
    const DlId = req.body.DlId;
    const Status = req.body.Status; // Extract phone number from request body

    const updatedUser = await DlUser.findByIdAndUpdate(DlId, { Status: Status }, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};


const DeleteDl = async (req, res) => {
  try {
    // const DlId = req.body.Id;
    const DeleteDlData = await DlUser.findByIdAndDelete(req.body.Id);

    if (!DeleteDlData) {
      return res.status(404).json({
        status: 404,
        message: "Dl Data not found",
      });
    }

    res.json({
      status: 200,
      message: "Dl Delete successfully",
      data: DeleteDlData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};




module.exports = { DlUserInsert, ReadDlUsers, getDlByUser, updateDlStatus, DeleteDl };