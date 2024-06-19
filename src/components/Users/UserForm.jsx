import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import LabelTextField from '../ui/LabelTextField';
import LabelTextArea from '../ui/LabelTextArea';
import ColorPicker from '../ui/ColorPicker';
import Button from '../ui/Button';
import PlaceholderImage from '../../assets/Placeholder 600x400.png'
import { CreateUser } from '../../services/Users';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UserForm = ({
  firstname = "",
  lastname = "",
  email = "",
  description = "",
  borderColor = "",
  rol = "",
  image = "",
  bio = "",
}) => {

  const isNewUser = firstname === "" ? true : false;
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(image !== "" ? image : PlaceholderImage);
  const [imageData, setImageData] = useState();

  const methods = useForm({
    defaultValues: {
      firstname,
      lastname,
      email,
      description,
      borderColor,
      rol,
      bio,
    }
  });

  const handleImage = async (e) => {
    try {
      if (e.target.files && e.target.files[0]) {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setImageData(e.target.files[0])
      }
    } catch(error) {
      console.log(error);
      setImageUrl(PlaceholderImage)
    }
  }

  const onSubmit = (data) => {
    if(isNewUser) {
      toast.promise(
        CreateUser({...data, image: imageData})
          .then(() => navigate('/dashboard/users'))
          .catch(err => {
            toast.error('Something went wrong creating user \n details: ' + err);
            methods.reset();
            setImageUrl(PlaceholderImage)
          }), 
        {
          loading: 'Creating user...',
          success: <b>User created!</b>,
          error: <b>Problem creating user</b>
        }
      );
    } else {
      return;
    }
  }

  return (
    <div className="w-4/6 mx-auto flex flex-col gap-5">
      <h2 className="text-2xl underline font-semibold">Create user</h2>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-3" onSubmit={methods.handleSubmit(onSubmit)}>
          <LabelTextField 
            name="firstname"
            label="Firstname"
            type="text"
            validationRules={validationRules.firstname}
          />
          <LabelTextField
            name="lastname"
            label="Lastname"
            type="text"
            validationRules={validationRules.lastname}
          />
          <LabelTextField
            name="email"
            label="Email"
            type="text"
            validationRules={validationRules.email}
          />
          {isNewUser && (
            <LabelTextField
              name="password"
              label="Password"
              type="password"
              validationRules={validationRules.password}
            />
          )}
          <LabelTextArea 
            name="description"
            label="Description"
            validationRules={validationRules.description}
          />
          <ColorPicker
            name="borderColor"
            label="Color"
            validationRules={validationRules.borderColor}
          />
          <LabelTextField
            name="rol"
            label="Role"
            type="text"
            validationRules={validationRules.rol}
          />
          <LabelTextField
            name="bio"
            label="Bio"
            type="text"
          />
          <div className='flex flex-col max-w-full items-start gap-1'>
            <label htmlFor="image">Profile picture</label>
            <img className='w-2/3' src={imageUrl} alt="" />
            <input 
              {...methods.register("image", validationRules.image)}
              onChange={handleImage}
              type="file" name="image" id="image/*" accept='image' 
            />
          </div>
          <Button type="submit">
            Create
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

const validationRules = {
  firstname: {
    required: 'Firstname is required',
  },
  lastname: {
    required: 'Lastname is required',
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Not a valid email',
    }
  },
  password: {
    required: 'Password is required',
    minLength: {value: 6 , message: 'Password must consist of at least 6 characters'}
  },
  description: {
    required: 'Description is required',
  },
  borderColor: {
    required: 'Color is required'
  },
  rol: {
    required: 'Role is required'
  },
  image: {
    required: 'Image is required',
  },
}

export default UserForm