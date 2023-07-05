

interface ProfileImageProps {
    photoURL: string | undefined;
  }
  
  const ProfileImage: React.FC<ProfileImageProps> = ({ photoURL }) => {
    return (
      <div className="relative rounded-full w-12 h-12 overflow-hidden ">
        <img
          src={photoURL || '/adulticon.jpg'}
          alt="Profile Image"
          className="object-cover w-full h-full"
        />
      </div>
    );
  };
  
  export default ProfileImage;
  