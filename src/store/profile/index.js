import StateModule from "../module";
import axios from 'axios';


class ProfileState extends StateModule {

  initState() {
    return {
      profile: {},
    };
  }

  async setProfile(profile) {
    this.setState({
      ...this.getState(),
      profile: profile,
    })    
  }
}

export default ProfileState;
