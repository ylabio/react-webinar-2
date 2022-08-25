import React from "react";
import useSelector from "../../hooks/use-selector";
import ProfileFields from "../../components/profile-fields";

function ProfileForm() {


    const select = useSelector(state => ({
        user: state.authorization.name,
        profile: state.authorization
    }));

    const { email, phone, name } = select.profile;

    return (
        <>
            <ProfileFields email={email} phone={phone} name={name} />
        </>
    )



}


export default React.memo(ProfileForm);