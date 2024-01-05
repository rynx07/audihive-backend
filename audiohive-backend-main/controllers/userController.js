import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//ADMIN SIDE FUNCTIONALITIES 

//GET User Function
async function getUsers(req,res){
    try {
        const getusers = await prisma.users.findMany({
            include: {
                profile: true
            }
        })

        if (getusers){
           res.send(getusers)

        }
    } catch(err){
        // res.send(err, "Service Error")
        console.error(err)
        res.status(500).json({error: "error."})
    }
}


//ADD User Function << commented out 
async function addUser(req, res, next) {
    const { role, profile } = req.body;
    const { username, email, firstname, lastname, password, category } = profile;
  
    try {
      const createdUser = await prisma.users.create({
        data: {
          profile: {
            create: {
              username,
              email,
              firstname,
              lastname,
              password,
              category,
            },
          },
          role,
        },
      });
  
      res.status(200).json({ message: 'User created.', user_ID: createdUser.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
    }
  }



// DELETE User Function
async function deleteUser(req, res, next) {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const deletedUser = await prisma.users.delete({
      where: {
        id: id
      },
      select: {
        profile: {
          select: {
            username: true
          }
        }
      }
    });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ message: 'User deleted.', username: deletedUser.profile.username });
  } catch (err) {
    console.log('Failed to delete User', err);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
}


// UPDATE User Function
async function updateUser(req, res, next) {
  const { id, role, profile } = req.body;
  const { username, email, firstname, lastname, password, category } = profile;

  try {
    const updatedUser = await prisma.users.update({
      where: {
        id: id
      },
      data: {
        profile: {
          update: {
            username,
            email,
            firstname,
            lastname,
            password,
            category
          }
        },
        role
      }
    });

    res.status(200).json({ message: 'User updated.', user_ID: updatedUser.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
}



//END OF ADMIN FUNCTIONALITIES 

//REGISTRATION FUNCTION 
async function registerUser(req, res, next) {
  const { username, email, firstname, lastname, password, category, role } = req.body;

  // Check if the provided role is valid
  if (role !== 'MUSICIAN' && role !== 'EVENT_ORG') {
    return res.status(400).json({ error: 'Invalid role.' });
  }

  try {
    const createdUser = await prisma.users.create({
      data: {
        profile: {
          create: {
            username,
            email,
            firstname,
            lastname,
            password,
            category,
          },
        },
        role,
      },
    });

    res.status(200).json({ message: 'User registered.', user_ID: createdUser.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
}


//LOG IN FUNCTION
async function loginUser(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        profile: {
          username: username,
          password: password,
        },
      },
      include: {
        profile: true,
      },
    });

    // Check if the user exists and if the provided password matches
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const { id, profile } = user;

    // Assuming firstname and lastname are fields in the Profile model
    const { firstname, lastname } = profile;

    res.status(200).json({
      message: 'User logged in.',
      user_ID: id,
      firstname: firstname,
      lastname: lastname,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
}



const userController = { getUsers, addUser , deleteUser, updateUser, registerUser, loginUser}

export default userController;