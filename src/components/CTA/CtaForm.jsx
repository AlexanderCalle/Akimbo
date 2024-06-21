import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PlaceholderImage from '../../assets/Placeholder 600x400.png'
import { FormProvider, useForm } from 'react-hook-form';
import LabelTextField from '../ui/LabelTextField';
import LabelTextArea from '../ui/LabelTextArea';
import DatePicker from '../ui/DatePicker';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import { CreateCta, UpdateCta } from '../../services/CTA';
import ColorPicker from '../ui/ColorPicker';

const CtaForm = ({
  title = "",
  description = "",
  start_date = null,
  end_date = null,
  backgroundColor = "#111",
  image = "",
  id = ""
}) => {

  const isNewCta = title === "" ? true : false;
  const navigate = useNavigate();
  
  const [imageUrl, setImageUrl] = useState(image !== "" ? image : PlaceholderImage);
  const [imageData, setImageData] = useState(null);

  const methods = useForm({
    defaultValues: {
      title,
      description,
      start_date,
      end_date,
      backgroundColor
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

  const handleStartDate = (date) => {
    methods.setValue("start_date", date)
  }

  const handleEndDate = (date) => {
    methods.setValue("end_date", date)
  }

  const onSubmit = (data) => {
    if(isNewCta) {
      toast.promise(
        CreateCta({...data, image: imageData})
          .then(() => navigate('/dashboard/cta'))
          .catch(err => {
            toast.error('Something went wrong creating a cta \n details: ' + err);
            methods.reset();
            setImageUrl(PlaceholderImage)
          }), 
        {
          loading: 'Creating CTA...',
          success: <b>CTA created!</b>,
          error: <b>Problem creating CTA</b>
        }
      );
    } else {
      // Update CTA
      toast.promise(
        UpdateCta({...data, image: imageData, docId: id})
        .then(() => navigate('/dashboard/cta'))
          .catch(err => {
            toast.error('Something went wrong updating CTA \n details: ' + err);
            methods.reset();
            setImageUrl(PlaceholderImage)
          }), 
        {
          loading: 'Updating CTA...',
          success: <b>CTA updated!</b>,
          error: <b>Problem updating CTA</b>
        }
      )
    }
  }

  return (
    <div className="w-4/6 mx-auto flex flex-col gap-5">
      <h2 className="text-2xl underline font-semibold">{isNewCta ? "Create" : "Update"} CTA</h2>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-3" onSubmit={methods.handleSubmit(onSubmit)}>
          <LabelTextField
            label="Title"
            name="title"
            type="text"
            validationRules={validationRules.title}
          />
          <LabelTextArea
            label="Description"
            name="description"
            validationRules={validationRules.description}
          />
          <label htmlFor="start_date">Start date</label>
          <DatePicker value={start_date?.toDate()} setValue={handleStartDate} />
          <label htmlFor="start_date">End date</label>
          <DatePicker value={end_date?.toDate()} setValue={handleEndDate} />
          <ColorPicker
            name="backgroundColor"
            label="Color"
            currentColor={backgroundColor}
            validationRules={validationRules.backgroundColor}
          />
          <div className='flex flex-col max-w-full items-start gap-1'>
            <label htmlFor="image">Profile picture</label>
            <img className='w-2/3' src={imageUrl} alt="" />
            <input 
              {...methods.register("image")}
              onChange={handleImage}
              type="file" name="image" id="image/*" accept='image' 
            />
          </div>
          <Button type="submit">
            {isNewCta ? "Create" : "Update"}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

const validationRules = {
  title: {
    required: "Title is required",
    minLength: {
      value: 4,
      message: "Title must be at least 4 characters long"
    }
  },
  description: {
    required: "Description is required",
  },
  start_date: {
    required: "Start date is required",
  },
  end_date: {
    required: "End date is required",
  },
  backgroundColor: {
    required: "Color is required",
  }
}

export default CtaForm