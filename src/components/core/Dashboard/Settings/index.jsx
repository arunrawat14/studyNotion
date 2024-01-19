import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (

    <div className='h-[calc(100vh-3.5rem)] w-[calc(100vw-222px)] overflow-x-hidden ' >

      <div className='  flex flex-col gap-[10px] ml-8 m-4 p-5  w-[1217px] bg-transparent h-[120px]' >
        <div className=" w-[70%]  ml-40 ">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Edit Profile
          </h1>
          {/* Change Profile Picture */}
          <ChangeProfilePicture />
          {/* Profile */}
          <EditProfile />
          {/* Password */}
          <UpdatePassword />
          {/* Delete Account */}
          <DeleteAccount />
        </div>
      </div>
    </div>
  )
}