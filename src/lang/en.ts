export default {
  appMenu: {
    logout: "logout",
    dashboard: "Dashboard",
    favourites: "Favourites",
    findSpace: "Find a Space",
    recentlyViewed: "Recently Viewed",
    accountSettings: "Account Settings",
    about: "About Alpha Victor",
    tos: "Terms & Conditions",
    admin: "Admin",
    contact: "Contact",
    email: "hello@alphavictor.com",
    footer: "AlphaVictor® is a registered trademark of Uncoded Limited, a registered company in England and Wales with company number 11435074"
  },
  pages: {
    dashboard: {
      placeholder: "Enter shortcode",
      noSpacesFound: "no.spaces.found",
      shortCodeTip: "Please enter a short code or explore spaces.",
      exploreBtn: "Explore Spaces"
    },
    favourites: {
      header: "Favourites",
      back: "<< back",
      exploreBtn: "Explore Spaces",
    },
    findSpace: {
      header: "Find a space",
      back: "<< back",
      locations: "Locations",
      placeholder: "Search space or location",
      options: {
        notifications: {
          title: "Notifications",
          subtitle: "Notifications Settings",
        },
        bluetooth: {
          title: "Bluetooth",
          subtitle: "Bluetooth Settings",
        },
        location: {
          title: "Location",
          subtitle: "Location Settings",
        },
        password: {
          title: "Password",
          subtitle: "Password Settings",
        },
        language: {
          title: "Language",
          subtitle: "Language Settings",
        },
        deleteAccount: {
          title: "Delete Account",
          subtitle: "Delete Your Account",
        }
      }
    },
    recentlyViewed: {
      header: "Recently viewed",
      back: "<< back",
    },
    accountSettings: {
      header: "Account Settings",
      back: "<< back",
      noNameSet: "No name set",
      noEmailSet: "No email set",
      profile: {
        noNameSet: "No name set",
        noEmailSet: "No email set",
        placeholders: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          gender: "Gender",
        },
        gender: {
          male: "Male",
          female: "Female",
          not: "Prefer not to say"
        },
        updateProfileBtn: "Update Profile"
      },
      notifications: {
        label: "Notifications",
        description: "We use notifications to keep you in the loop. Update your notifications settings below.",
        allowNotifications: "Allow notifications",
        receiveNotifications: "Receive Notifications",
      },
      location: {
        label: "Location",
        description: "We use your location to check spaces near you. Update your location settings below.",
        allowLocation: "Allow location",
        accurateLocation: "Accurate Location"
      },
      bluetooth: {
        label: "Bluetooth",
        description: "We use bluetooth to ping beacons for a more accurate location. /n Update your bluetooth settings below.",
        allowBluetooth: "Allow Bluetooth",
        pingBeacons: "Ping Beacons",
      },
      language: {
        label: "Language",
        description: "You can switch between languages via the drop down below.",
        placeholder: "Select Language",
        english: "English",
        french: "French",
        german: "German",
        updateLanguageBtn: "Update Language Settings",
      },
      password: {
        label: "Update Password",
        description: "Use the form below to update/change your password.",
        updatePasswordBtn: "Update Password",
        placeholders: {
          current: "Current Password",
          new: "New Password",
          confirm: "Confirm New Password"
        }
      },
      deleteAccount: {
        label: {
          deleted: "Account Deleted",
          confirm: "Confirm Deletion"
        },
        question: {
          deleted: "Your account had been deleted from our system. We hope to see you again in the future.",
          confirm: "Are you sure you want to delete your account?"
        },
        description: {
          deleted: "Best wishes from the Alpha Victor team.",
          confirm: "Your account can’t be restored after it’s been deleted. Are you sure you want to continue? If so, please confirm your password."
        },
        confirmDeletionBtn: {
          deleted: "Got it, thanks",
          confirm: "Confirm Deletion"
        }
      },
    },
    about: {
      back: "<< back",
      header: "About Alpha Victor",
      sentence1: "Alpha Victor seeks to continually enhance the user experience in the workspace. The platform also provides workplace teams with the information they need to make future decisions on the design of new, better performing spaces.",
      sentence2: "Alpha Victor delivers dynamic user guides for users of the space alongside a simple way for them to give their feedback, whether at home or in the office."
    }
  },
}