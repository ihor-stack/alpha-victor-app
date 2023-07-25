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
    },
    admin: {
      documents: {
        documentTypes: {
  
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
          locations: "Locations",
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
    }
  },
  components: {
    admin: {
      equipment: {
        AssetTypeModal: {
          header: "Add new asset type",
          paragraph: "You can create a new asset type via the form below.",
          button: "Add new asset type +",
        },
        DocumentModal: {
          addDocumentHeader: "Add new document +",
          uploadDocumentTypeParagraph: "You can upload a document and document type using the form below.",
          uploadDocumentParagraph: "Upload document",
          clickSpan: "Click to browse device",
          addNewAssetbutton: "Add new asset type +",
        },
        ManufacturerModal: {
          addManufacturerButton: "Add new manufacturer +",
          addManufacturerHeader: "Add new manufacturer",
          addManufacturerParagraph: "You can create a new manufacturer via the form below.",
        },
        equipmentModal: {
          addEquipmentButton: "Add new equipment +",
          addEquipmentHeader: "Add new equipment",
          createEquipmentParagraph: "You can create a new equipment the form below.",
          manufacturerLabel: "Manufacturer",
          selectManufacturerPlaceholder: "Select manufacturer",
          selectAssetTypePlaceholder: "Select asset type",
          inputModelPlaceholder: "Input Model",
          inputSerialNumberPlaceholder: "Input Serial number",
        }
      },
      locations: {
        adminLocationsForm: {
          locationNameLabel: "Location name",
          locationPrefixLabel: "Location prefix",
          contactNameLabel: "Main contact name",
          emailAddressLabel: "Email address",
          phoneNumberLabel: "Phone number",
          sosNumberLabel: "SOS Number",
          publicWifiLabel: "Public Wifi",
          wifiPasswordLabel: "Wifi Password",
          addressLine1Label: "Address Line 1",
          addressLine2Label: "Address Line 2",
          cityLabel: "City",
          postcodeLabel: "Postcode",
          saveChangesButton: "Save changes",
          exportQRCodesButton: "Export QR Codes",
          floorsHeader: "Floors",
        },
        adminLoacationsList: {
          floorNameLabel: "Floor name",
          shortNameLabel: "Short name",
          saveFloorButton: "Save floor",
        }
      },
      spaceMetadata: {
        spaceFeatureModal: {
          addNewSpaceFeatureButton: "Add new space feature +",
          addNewSpaceFeatureHeader: "Add new space feature",
          createNewSpaceFeatureParagraph: "You can create a new space feature via the form below.",
        },
        spaceTypeModal: {
          addNewSpaceTypeButton: "Add new space type +",
          createNewSpaceTypeParagraph: "You can create a new space Type via the form below.",

        },
      },
      spaces: {
        documentField: {
          editDocumentTypeHeader: "Edit document Type",
          removeButton: ">> remove",
          saveButton: ">> save",
        },
        organisationsSelect: {
          viewAllSpan: ">> view.all"
        }
      }
    },
    modals: {
      decisionTreeNodeModal: {
        addEmail: {
          emailAddressLabel: "Email Address",
          emailAddressInputPlaceholder: "Enter a email address",
          confirmSelectionButton: "Confirm Selection",
          backToDestinationButton: "Back to destination",
        },
        addPhone: {
          phoneNumberLabel: "Phone Number",
          phoneNumberPlaceholder: "Enter phone number",
          confirmSelectionButton: "Confirm Selection",
          backToDestinationButton: "Back to destination",
        },
        customList: {
          selectedCol: "selected",
          greaterSelectedCol: ">> select",
        },
        editAnswer: {
          updateButton: "Update",
        },
        editDestination: {
          destinationTypeLabel: "Destination Type",
          selectTypePlaceholder: "Select type",
          outcomeLabel: "Outcome label",
          outcomePlaceholder: "Enter new outcome",
          nextButton: "Next",
        },
        selectArticle: {
          articleTitleLabel: "Article title",
          articleTitleInputPlaceholder: "Enter title",
          searchInputPlaceholder: "Search for an article",
          addArticleButton: "Add article +",
          cancelButton: "Cancel",
          addNewArticleButton: "Add new article +",
          confirmSelectionButton: "Confirm Selection",
          backToDestinationButton: "Back to destination",
        },
        selectDocument: {
          selectDocumentTitle: "Select Document",
          selectDocumentDescription: "You can select a document to be presented via the drop downs below.",
          manufacturerLabel: "Manufacturer",
          manufacturerSelectPlaceholder: "Select manufacturer",
          typeLabel: "Type",
          typeSelectPlaceholder: "Select type",
          modelLabel: "Model",
          modelSelectPlaceholder: "Select model",
          confirmSelectionButton: "Confirm Selection",
          backToDestinationButton: "Back to destination",
        },
        selectVideo: {
          selectVideoTitle: "Select video",
          selectVideoDescription: "You can select a video to be presented via the list below.",
          dividerSpan: "or",
          addVideoLabel: "Add new video",
          videoURLInputPlaceholder: "Enter Video or YouTube URL",
          addVideoButton: "Add +",
          addVideoTitleLabel: "Add video title",
          addVideoTitlePlaceholder: "New video added",
        },
      },
      contactUsModal: {
        contactUsModalParagraph: "Simply fill out the form below and someone from AlphaVictor will\r\nbe in touch soon.",
        nameInputPlaceholder: "Your name",
        emailInputPlaceholder: "Your email address",
        numberInputPlaceholder: "Your number",
        messageInputPlaceholder: "Your message",
        sendMessageButton: "Send Message",
      },
      deleteFloorModal: {
        deleteFloorButton: "Delete floor",
        deleteFloorHeader: "Delete floor",
        deleteFloorParagraph: "Are you sure you wish to delete this floor, this action cannot\r\nbe undone",
        deleteButton: "Yes, delete",
        cancelButton: "No, cancel",
      },
      deleteOrganisationModal: {
        deleteOrganisationButton: "Delete organisation",
        deleteOrganisationHeader: "Delete organisation",
        deleteOrganisationParagraph: "Are you sure you wish to delete this organisation, this action\r\ncannot be undone",
      },
      issuesModal: {
        addCommentLabel: "Add comment",
        addCommentPlaceholder: "Enter a comment here",
        selectStatusHeader: "Select Status",
        lowImpactLabel: "low.impact",
        highImpactLabel: "high.impact",
        resolveLabel: "Resolve",
        statusHeader: "status",
      },
      newFloorModal: {
        addNewFloorButton: "Add new floor +",
        addNewFloorHeader: "Add new floor",
        createNewFloorParagraph: "You can create a new floor via the form below.",
        floorNameInputPlaceholder: "Floor name",
        floorShortNameInputPlaceholder: "Floor Short Name",
      },
      newLocationModal: {
        addNewLocationSpan: "Add new location +",
        addNewLocationHeader: "Add new location",
        addNewLocationParagraph: "You can create a new location via the form the form below.",
        locationNameLabel: "Location name",
        headquartersInputPlaceholder: "e.g. Headquarters",
        locationPrefixLabel: "Location prefix",
        newLocationInputPlaceholder: "e.g. HQ",
      },
      newOrganisationModal: {
        createNewOrganisationButton: "Create new organisation +",
        addNewOrganisationHeader: "Add new organisation",
        createNewOrganisationParagraph: "You can create a new organisation via the form below.",
        OrganisationNameInputPlaceholder: "Organisation Name",
        addNewOrganisationButton: "Add new organisation +",
      },
      newSpaceModal: {
        addNewSpaceButton: "Add new space +",
        addNewSpaceHeader: "Add new space",
        createNewSpaceParagraph: "You can create a new space via the form below.",
        spaceNameLabel: "Space name",
        spaceNamePlaceholder: "Space Name",
        spaceShortcodeLabel: "Space shortcode",
        spaceShortcodePlaceholder: "Space Shortcode",
      },
      organisationSelectModal: {
        selectOrganisationHeader: "Select organisation",
        selectOrganisationParagraph: "Here you can select the organisation that you’d like to see spaces\r\nin.",
        selectOrganisationPlaceholder: "Select organisation",
        confirmButton: "Confirm",
      },
      ReportIssueModal: {
        reportIssueHeader: "Report Issue",
        reportIssueParagraph: "Please provide details on the issue you're facing, and which\r\nequipment",
        selectEquipmentLabel: "Select Equipment",
        selectEquipmentPlaceholder: "Select equipment",
        addTitleLabel: "Add title",
        issueTitlePlaceholder: "Enter title of issue",
        addCommentLabel: "Add Comment",
        enterCommentPlaceholder: "Enter a comment here",
        submitIssueButton: "Submit Issue",
      },
      roomEquipmentModal: {
        deviceInformationParagraph: "device.information",
        technicalLabel: "Technical",
        installationLabel: "Installation",
        userGuideButton: "User Guide",
        reportIssueButton: "Report Issue",
      },
      userManagementModal: {
        assignedOrganisationLabel: "Assigned Organisations",
        removeButton: ">> remove",
        dividerSpan: "or",
        addOrganisationLabel: "Add to organisation",
        selectOrganisationPlaceholder: "Select organization",
        saveAndCloseButton: "Save and close",
      },
      userOrgPermissionModal: {
        selectRolePlaceholder: "Select role",
        saveAndCloseButton: "Save and close",
      },
    },
    onboarding: {
      enableButton: "Enable",
      accountExists: "Already have an account?",
      sendLoginLinkSpan: "Send me a login link",
      loginWithEmailSpan: "Login with email",
    },
    shared: {
      imageGallery: {
        removeButton: ">> remove",
      },
    },
    space: {
      getHelp: {
        answerNode: {
          cancelAskButton: "Cancel and ask again",
        },
        questionNode: {
          articleTemplateDescription: "I've found the following article that I think you'll find useful",
          videoTemplateDescription: "I've found the following video that I think you'll find useful",
          documentTemplateDescription: "I've found the following document that I think you'll find helpful",
          appreciateDetailsDescription: "We'd really appreciate some more details - click below to send us an email",
          callDescription: "I think it's best you speak to someone - click below to place a call",
        },
      },
      documentsList: {
        viewSpan: ">> view",
      },
      spaceOptionsMenu: {
        roomEquipmentSpan: "Room Equipment",
        stepByStepGuides: "Step By Step Guides",
        knownIssuesParagraph: "Known Issues",
        documentsSpan: "Documents",
      },
      spaceWifiInfo: {
        wifiNetworkParagraph: "Wifi.network",
        wifiPasswordParagraph: "Wifi.password",
        connectButton: "Connect",
      },
    },
  },
  layouts: {
    adminLayout: {
      backSpan: "<< back",
    },
  }
}