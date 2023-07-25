export default {
  layout: {
    back: "<< back",
  },
  locationLayout: {
    back: "<< back",
  },
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
  desktopNav:  {
    logout: "logout",
    dashboard: "Dashboard",
    favourites: "Favourites",
    findSpace: "Find a Space",
    recentlyViewed: "Recently Viewed",
    accountSettings: "Account Settings",
    about: "About Alpha Victor",
    tos: "Terms & Conditions",
    administration: "administration",
    organisations: "Organisations",
    equipment: "Equipment",
    documentTypes: "Document Types",
    users: "Users",
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
      location: {
        title: "Locations",
      },
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
    space: {
      article: {
        title: "Article",
        back: "<< back"
      },
      documents: {
        title: "Documents",
        back: "<< back"
      },
      document: {
        back: "<< back"
      },
      equipment: {
        title: "Room Equipment",
        back: "<< back"
      },
      feedback: {
        title: "Feedback",
        back: "<< back",
        content: "EMBED TYPEFORM USING TYPEFORM ID",
      },
      getHelp: {
        title: "Step By Step Guides",
        back: "<< back",
      },
      knownIssues: {
        title: "Known Issues",
        back: "<< back",
        itemLabel: "no.issues.reported",
        footer: "Report Issue",
      },
      panorama: {
        back: "<< back",
      },
      space: {
        back: "<< back",
        reportIssue: "Report Issue",
        giveFeedback: "Give Feedback",
      },
      video: {
        back: "<< back",
        label: "Autoplay"
      }
    },
    about: {
      back: "<< back",
      header: "About Alpha Victor",
      sentence1: "Alpha Victor seeks to continually enhance the user experience in the workspace. The platform also provides workplace teams with the information they need to make future decisions on the design of new, better performing spaces.",
      sentence2: "Alpha Victor delivers dynamic user guides for users of the space alongside a simple way for them to give their feedback, whether at home or in the office."
    },
    admin: {
      documents: {
        documentTypes: {
          title: "Document Types",
          add: "Add new +",
          current: "Current Document Types",
        }
      },
      equipment: {
        details: {
          model: "Model",
          sn: "Serial Number",
          remove: ">> remove",
          saveBtn: "Save Changes",
        },
        view: {
          title: "Equipment",
          manufacturers: "Manufacturers",
          assetTypes: "Asset Types",
        }
      },
      organisations: {
        list: {
          title: "Organisations",
        },
        view: {
          details: {
            title: "Details",
            organisationName: "Organisation name",
            shortcodePrefix: "Shortcode prefix",
            contactName: "Contact name",
            email: "Email address",
            phone: "Phone number",
            language: "Language",
            address1: "Address line 1",
            address2: "Address line 2",
            city: "City",
            zip: "Postcode",
            label: "Website / email domain(s)",
            press: "Press enter to add",
            saveBtn: "Save changes",
          },
          theme: {
            title: "Theme",
            logo: "Logo",
            bg: "Background Image",
            buttonText: "Select File",
            dark: "Dark mode",
            enableDark: "Enable dark mode",
            primary: "Primary colour",
            secondary: "Secondary colour",
            saveBtn: "Save changes",
          },
          spaceMetadata: {
            title: "Space Metadata",
            spaceTypes: "Space Types",
            spaceFeatures: "Space Features",
          },
          documentTypes: {
            title: "Document Types",
            addNew: "Add new +",
            current: "Current Document Types",
          },
          decisionTrees: {
            title: "Decision Trees",
            documentTypes: "Document Types",
            addNew: "Add new +",
            current: "Current Decision Trees",
            view: ">> view",
            details: {
              back: "<< back",
              saveBtn: "Save decision tree",    
            }
          },
          integrations: {
            title: "Integrations",
            header: "Ubiquisense",
            clientId: "Client ID",
            clientSecret: "Client Secret",
            saveBtn: "Save changes",
            list: {
              title: "Integration",
              integration: "Integration",
            }
          },
          locations: {
            title: "Locations",
            announcement: {
              title: "Announcement",
              labelTitle: "Title",
              labelContent: "Content",
              saveBtn: "Save announcement",
            },
            beacon: {
              title: "Beacon",
              minorLabel: "Current Minor",
              majorLabel: "Current Major",
              placeholder: "Scan for beacons",
              updateBtn: "Update selected beacon",
              removeBtn: "Unlink beacon",
            },
            devices: {
              title: "Devices",
              sn: "Serial Number",
              installer: "Installer",
              installDate: "Install Date",
              expiryDate: "Warranty expiry date",
              description: "Description",
              photos: "Photos",
              saveBtn: "Save changes",
              deleteBtn: "or delete device",
            },
            integrations: {
              title: "Integrations",
              subtitle: "Ubiqisense",
              selectLocation: "Select location",
              saveBtn: "Save changes",
              clearBtn: "or clear integration"
            },
            panorama: {
              icon: "Howard Street Belfast",
              label: "Set starting view",
              deleteBtn: "Delete panorama",
            },
            spaces: {
              name: "Space name",
              shortcode: "Space shortcode",
              roomType: "Room type",
              notifyRoomType: "No room types exist",
              capacity: "Capacity",
              typeform: "Typeform ID",
              decision: "Decision Tree",
              notifyDecisionTree: "No decision trees exist",
              photos: "Photos",
              documents: "Documents",
              remove: ">> remove",
              saveBtn: "Save changes",
              deleteBtn: "Delete space",
            },
            wifi: {
              title: "Wifi Password",
              network: "Wifi Network",
              password: "Wifi Password",
              show: "Show wifi password",
              showSpace: "Show wifi password within space",
              saveBtn: "Save changes",
            }
          },
        }
      },
      users: {
        title: "Users",
        account: "Account",
        status: "Status",
        email: "Email",
        role: "Role",
        active: "Active",
        deleted: "Deleted",
        inactive: "Inactive",
      }
    },
    static: {
      legalNotices: {
        title: "Legal Notices",
        back: "<< back",
        menuBtn: "Nav Menu Button",
        content1: {
          header: "Barcode scanner",
          subtitle: "@capacitor-community/barcode-scanner",
          p1: "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:",
          p2: "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.",
          p3: "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.",
        },
        content2: {
          header: "Google Maps",
          subtitle: "@googlemaps/js-api-loader",
          p: "Licensed under the Apache License, Version 2.0 (the \"License\"); you may not use this file except in compliance with the License.",
        }
      },
      tos: {
        title: "Terms & Conditions",
        back: "<< back",
        menuBtn: "Nav Menu Button",
        content1: {
          header: "Privacy Policy",
          subtitle: "Last updated August 26th, 2022",
          p1: "This privacy notice for Uncoded Limited (doing business as Alpha Victor) ('Alpha Victor', 'we', 'us', or 'our',), describes how and why we might collect, store, use, and/or share ('process') your information when you use our services ('Services'), such as when you:",
          p2: "Visit our website at http://www.alphavictor.com, or any website of ours that links to this privacy notice Download and use our mobile application (OnlineInside), or any other application of ours that links to this privacy notice",
          p3: "Engage with us in other related ways, including any sales, marketing, or events",
          p4: "Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at hello@uncoded.com.",
        },
        content2: {
          header: "Summary of key points",
          p: "This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for. You can also click here to go directly to our table of contents."
        }
      },
    }
  },
}