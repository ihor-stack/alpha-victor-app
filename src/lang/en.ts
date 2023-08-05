export default {
  layout: {
    back: "<< back",
  },
  locationLayout: {
    back: "<< back",
  },

  pages: {
    dashboard: {
      placeholder: "Enter shortcode",
      noSpacesFound: "no.spaces.found",
      shortCodeTip: "Please enter a short code or explore spaces.",
      exploreBtn: "Explore Spaces",
      alt: "Switch organisation",
      slider: {
        title1: "Nearby spaces",
        title2: "Recently viewed",
      },
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
        },
      },
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
          not: "Prefer not to say",
        },
        updateProfileBtn: "Update Profile",
      },
      notifications: {
        label: "Notifications",
        description:
          "We use notifications to keep you in the loop. Update your notifications settings below.",
        allowNotifications: "Allow notifications",
        receiveNotifications: "Receive Notifications",
      },
      location: {
        label: "Location",
        description:
          "We use your location to check spaces near you. Update your location settings below.",
        allowLocation: "Allow location",
        accurateLocation: "Accurate Location",
      },
      bluetooth: {
        label: "Bluetooth",
        description:
          "We use bluetooth to ping beacons for a more accurate location. /n Update your bluetooth settings below.",
        allowBluetooth: "Allow Bluetooth",
        pingBeacons: "Ping Beacons",
      },
      language: {
        label: "Language",
        description:
          "You can switch between languages via the drop down below.",
        placeholder: "Choose your language",
        english: "English",
        welsh: "Welsh",
        french: "French",
        german: "German",
        spanish: "Spanish",
        polish: "Polish",
        updateLanguageBtn: "Update Language Settings",
      },
      password: {
        label: "Update Password",
        description: "Use the form below to update/change your password.",
        updatePasswordBtn: "Update Password",
        placeholders: {
          current: "Current Password",
          new: "New Password",
          confirm: "Confirm New Password",
        },
      },
      deleteAccount: {
        label: {
          deleted: "Account Deleted",
          confirm: "Confirm Deletion",
        },
        question: {
          deleted:
            "Your account had been deleted from our system. We hope to see you again in the future.",
          confirm: "Are you sure you want to delete your account?",
        },
        description: {
          deleted: "Best wishes from the Alpha Victor team.",
          confirm:
            "Your account can’t be restored after it’s been deleted. Are you sure you want to continue? If so, please confirm your password.",
        },
        confirmDeletionBtn: {
          deleted: "Got it, thanks",
          confirm: "Confirm Deletion",
        },
      },
    },
    space: {
      article: {
        title: "Article",
        back: "<< back",
      },
      documents: {
        title: "Documents",
        back: "<< back",
      },
      document: {
        back: "<< back",
      },
      equipment: {
        title: "Room Equipment",
        back: "<< back",
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
        label: "Autoplay",
      },
    },
    about: {
      back: "<< back",
      header: "About Alpha Victor",
      sentence1:
        "Alpha Victor seeks to continually enhance the user experience in the workspace. The platform also provides workplace teams with the information they need to make future decisions on the design of new, better performing spaces.",
      sentence2:
        "Alpha Victor delivers dynamic user guides for users of the space alongside a simple way for them to give their feedback, whether at home or in the office.",
    },
    admin: {
      documents: {
        documentTypes: {
          title: "Document Types",
          add: "Add new +",
          current: "Current Document Types",
          placeholder1: "Enter new document type",
          placeholder2: "Document Type",
        },
      },
      equipment: {
        details: {
          model: "Model",
          manufacturer: "Manufacturer",
          assetType: "Asset Type",
          sn: "Serial Number",
          remove: ">> remove",
          saveBtn: "Save Changes",
        },
        view: {
          title: "Equipment",
          manufacturers: "Manufacturers",
          assetTypes: "Asset Types",
          assetType: "Asset Type",
          manufacturer: "Manufacturer",
        },
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
            language: "Language(s)",
            address1: "Address line 1",
            address2: "Address line 2",
            city: "City",
            postCode: "Postcode",
            website: "Website / email domain(s)",
            visibilityToggle: "Anonymous Access",
            visibilityToggleText: "Spaces are available to anonymous users",
            press: "Press enter to add",
            saveBtn: "Save changes",
            placeholders: {
              organisation: "Organisation",
              apl: "APL",
              email: "youremail@domain.com",
              phone: "01245 000000",
              address1: "123 Main Street",
              address2: "",
              city: "London",
              postCode: "S1 3LL",
              website: "ex: website.com",
            },
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
            placeholders: "Enter new document type",
          },
          decisionTrees: {
            title: "Decision Trees",
            documentTypes: "Document Types",
            placeholder: "Add new decision tree",
            addNew: "Add new +",
            current: "Current Decision Trees",
            view: ">> view",
            details: {
              back: "<< back",
              saveBtn: "Save decision tree",
            },
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
            },
          },
          locations: {
            title: "Locations",
            announcement: {
              title: "Announcement",
              labelTitle: "Title",
              labelContent: "Content",
              labelStart: "Start date/time",
              labelEnd: "End date/time",
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
              name: "Name",
              sn: "Serial Number",
              installer: "Installer",
              installDate: "Install Date",
              macAddress: "Mac Address",
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
              clearBtn: "or clear integration",
            },
            panorama: {
              icon: "Howard Street Belfast",
              label: "Set starting view",
              change: "Change panorama",
              add: "Add panorama",
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
            },
          },
        },
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
        placeholder: "Select role",
      },
    },
    static: {
      legalNotices: {
        title: "Legal Notices",
        back: "<< back",
        menuBtn: "Nav Menu Button",
        content1: {
          header: "Barcode scanner",
          subtitle: "@capacitor-community/barcode-scanner",
          p1: 'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
          p2: "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.",
          p3: 'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
        },
        content2: {
          header: "Google Maps",
          subtitle: "@googlemaps/js-api-loader",
          p: 'Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.',
        },
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
          p: "This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for. You can also click here to go directly to our table of contents.",
        },
      },
    },
    allowAccess: {
      headline1: "We need some",
      headline2: "access.",
      location: {
        title: "Location",
        description: "To allow us to see which room you’re in",
        alt: "Icon of a map pin marker",
      },
      bluetooth: {
        title: "Bluetooth",
        description: "To ping beacons for a more accurate location",
        alt: "Bluetooth icon",
      },
      notifications: {
        title: "Notifications",
        description: "To keep you in the loop",
        alt: "Icon of a bell",
      },
      btn: "Got it",
      modal: {
        enable: "Enable",
        text1: "Please allow ",
        text2: " when prompted on the next screen for a better app experience",
        language: "Language",
        selection: "selection",
        languageText2:
          "Please select your preferred language to use when using the application.",
        confirm: "Confirm",
      },
    },
    home: {
      headline: "a better experience",
      signin: "Log in",
      signup: "Sign up",
      signinsignup: "Login or register",
      anonymousMessage:
        "Save favourite spaces and devices for quick access, browse available resources and more with a free Alpha Victor account.",
      emailSignin: "Prefer to login via email?",
      link: "Send me a login link",
      resetPassword: "I've forgot my password",
    },
  },
  components: {
    admin: {
      equipment: {
        assetTypeModal: {
          header: "Add new asset type",
          paragraph: "You can create a new asset type via the form below.",
          button: "Add new asset type +",
          cameraPlaceholder: "e.g. camera",
          chooseIconLabel: "Choose an icon",
        },
        documentModal: {
          addDocumentButton: "Add new document +",
          addDocumentHeader: "Add new document +",
          uploadDocumentTypeParagraph:
            "You can upload a document and document type using the form below.",
          uploadDocumentParagraph: "Upload document",
          clickSpan: "Click to browse device",
          addNewAssetbutton: "Add new asset type +",
          documentTypeLabel: "Document Type",
        },
        manufacturerModal: {
          addManufacturerButton: "Add new manufacturer +",
          addManufacturerHeader: "Add new manufacturer",
          addManufacturerParagraph:
            "You can create a new manufacturer via the form below.",
          samSungPlaceholder: "e.g. samsung",
        },
        equipmentModal: {
          addEquipmentButton: "Add new equipment +",
          addEquipmentHeader: "Add new equipment",
          createEquipmentParagraph:
            "You can create a new equipment the form below.",
          manufacturerLabel: "Manufacturer",
          selectManufacturerPlaceholder: "Select manufacturer",
          selectAssetTypePlaceholder: "Select asset type",
          inputModelPlaceholder: "Input Model",
          inputSerialNumberPlaceholder: "Input Serial number",
          assetTypeLabel: "Asset type",
          modelLabel: "Model",
          serialNumberLabel: "Serial number",
          inputModelLabel: "Model",
        },
      },
      locations: {
        adminFloorsField: {
          silhouetteOfMountainsAlt: "Silhouette of mountains",
          saveButton: ">> save",
          removeButton: ">> remove",
          documentTypeInputPlaceholder: "Document Type",
        },
        adminLocationsForm: {
          locationNameLabel: "Location name",
          locationPrefixLabel: "Location prefix",
          contactNameLabel: "Main contact name",
          emailAddressLabel: "Email address",
          phoneNumberLabel: "Phone number",
          sosNumberLabel: "SOS Number",
          sosVIPLabel: "SOS VIP",
          sosVIPText: "SOS is only available for VIP users",
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
        adminLocationsList: {
          spacesHeader: "Spaces",
          floorNameLabel: "Floor name",
          shortNameLabel: "Short name",
          saveFloorButton: "Save floor",
        },
      },
      spaceMetadata: {
        spaceFeatureModal: {
          wifiPlaceholder: "e.g. wifi",
          addNewSpaceFeatureButton: "Add new space feature +",
          addNewSpaceFeatureHeader: "Add new space feature",
          createNewSpaceFeatureParagraph:
            "You can create a new space feature via the form below.",
        },
        spaceTypeModal: {
          addNewSpaceTypeButton: "Add new space type +",
          createNewSpaceTypeParagraph:
            "You can create a new space Type via the form below.",
          addNewSpaceTypeHeader: "Add new space type",
          meetingRoomInputPlaceholder: "e.g. meeting room",
        },
      },
      spaces: {
        documentModal: {
          addNewDocumentLabel: "Add New Document  >>",
          addNewDocumentHeader: "Add New Document",
          uploadDocumentButton: "Upload document",
        },
        newDeviceModal: {
          addNewDeviceButton: "Add New device +",
          addNewDeviceHeader: "Add New device",
          nameLabel: "Name",
          serialNumberLabel: "Serial number",
          macAddressLabel: "Mac Address",
          installerLabel: "Installer",
          installDateLabel: "Install date",
          warrantyExpiryDateLabel: "Warranty expiration date",
          descriptionLabel: "Description",
        },
        panoramaModal: {
          editHotspotHeader: "Edit hotspot",
          selectDeviceLabel: "Select device",
          selectPlaceholder: "Select",
          orDiv: "or",
          addLabelLabel: "Add label",
          hotspotLabelPlaceholder: "Hotspot label",
          saveChangeButton: "Save change",
          orDeleteHotspotButton: "or delete hotspot",
        },
        photoModal: {
          addNewPhotoLabel: "Add New Photo  >>",
          addNewPhotoHeader: "Add New Photo",
          featuredPhotoLabel: "Featured Photo",
          featuredPhotoSubtitle: "This image will be featured for the space",
          saveButton: "Save",
          caption: "Caption",
        },
      },
      documentFieldOLD: {
        documentTypePlaceholder: "Document Type",
        saveButton: ">> save",
        removeButton: ">> remove",
      },
      documentField: {
        editDocumentTypeHeader: "Edit document Type",
        removeButton: ">> remove",
        saveButton: ">> save",
        documentTypePlaceholder: "Document Type",
      },
      itemField: {
        saveButton: ">> save",
        removeButton: ">> remove",
      },
      organisationsSelect: {
        viewAllSpan: ">> view.all",
        spanTen: ">> 10",
      },
      SpaceCard: {
        spanTen: ">> 10",
      },
    },
    dashboard: {
      dashboardSlider: {
        viewAllSpan: ">> view.all",
      },
    },
    modals: {
      decisionTreeNodeModal: {
        addEmail: {
          addEmailAddressDescription:
            "You can add a email address to be presented via the form field below. ",
          addEmailAddressTitle: "Add email address",
          emailAddressLabel: "Email Address",
          emailAddressInputPlaceholder: "Enter a email address",
          confirmSelectionButton: "Confirm Selection",
          backToDestinationButton: "Back to destination",
        },
        addPhone: {
          addPhoneNumberDescription:
            "You can add a phone number to be presented via the form field below. ",
          addPhoneTitle: "Add phone number",
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
          editAnswerTitle: "Edit answer",
          editAnswerDescription: "You can edit the answer via the form below.",
          answerLabel: "Answer",
          answerInputPlaceholder: "Enter Answer",
          updateButton: "Update",
        },
        editDestination: {
          editDestinationTitle: "Edit destination",
          adjustDestinationDescription:
            "You can adjust the destination and outcomes via the form below.",
          destinationTypeLabel: "Destination Type",
          selectTypePlaceholder: "Select type",
          outcomeLabel: "Outcome label",
          outcomePlaceholder: "Enter new outcome",
          nextButton: "Next",
        },
        selectArticle: {
          selectArticleTitle: "Select article",
          selectArticleDescription:
            "You can select an article to be presented via the list below.",
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
          selectDocumentDescription:
            "You can select a document to be presented via the drop downs below.",
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
          searchForVideoPlaceholder: "Search for a video",
          selectVideoTitle: "Select video",
          selectVideoDescription:
            "You can select a video to be presented via the list below.",
          dividerSpan: "or",
          addVideoLabel: "Add new video",
          videoURLInputPlaceholder: "Enter Video or YouTube URL",
          fetch: "Fetch",
        },
        fetchVideo: {
          videoDetails: "Video details",
          videoTitleLabel: "Video title",
          chapterTitleLabel: "Chapter title",
          chapterDescription: "Sub title / description",
        },
      },
      contactUsModal: {
        contactHeader: "Contact",
        contactUsModalParagraph:
          "Simply fill out the form below and someone from AlphaVictor will be in touch soon.",
        nameInputPlaceholder: "Your name",
        emailInputPlaceholder: "Your email address",
        numberInputPlaceholder: "Your number",
        messageInputPlaceholder: "Your message",
        sendMessageButton: "Send Message",
      },
      deleteFloorModal: {
        deleteFloorButton: "Delete floor",
        deleteFloorHeader: "Delete floor",
        deleteFloorParagraph:
          "Are you sure you wish to delete this floor, this action cannot be undone",
        deleteButton: "Yes, delete",
        cancelButton: "No, cancel",
      },
      deleteOrganisationModal: {
        deleteOrganisationButton: "Delete organisation",
        deleteOrganisationHeader: "Delete organisation",
        deleteOrganisationParagraph:
          "Are you sure you wish to delete this organisation, this action cannot be undone",
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
        createNewFloorParagraph:
          "You can create a new floor via the form below.",
        floorNameInputPlaceholder: "Floor name",
        floorShortNameInputPlaceholder: "Floor Short Name",
      },
      newLocationModal: {
        addNewLocationSpan: "Add new location +",
        addNewLocationHeader: "Add new location",
        addNewLocationParagraph:
          "You can create a new location via the form the form below.",
        locationNameLabel: "Location name",
        headquartersInputPlaceholder: "e.g. Headquarters",
        locationPrefixLabel: "Location prefix",
        newLocationInputPlaceholder: "e.g. HQ",
      },
      newOrganisationModal: {
        createNewOrganisationButton: "Create new organisation +",
        addNewOrganisationHeader: "Add new organisation",
        createNewOrganisationParagraph:
          "You can create a new organisation via the form below.",
        OrganisationNameInputPlaceholder: "Organisation Name",
        addNewOrganisationButton: "Add new organisation +",
      },
      newSpaceModal: {
        addNewSpaceButton: "Add new space +",
        addNewSpaceHeader: "Add new space",
        createNewSpaceParagraph:
          "You can create a new space via the form below.",
        spaceNameLabel: "Space name",
        spaceNamePlaceholder: "Space Name",
        spaceShortcodeLabel: "Space shortcode",
        spaceShortcodePlaceholder: "Space Shortcode",
      },
      organisationSelectModal: {
        selectOrganisationHeader: "Select organisation",
        selectOrganisationParagraph:
          "Here you can select the organisation that you’d like to see spaces in.",
        selectOrganisationPlaceholder: "Select organisation",
        confirmButton: "Confirm",
      },
      ReportIssueModal: {
        reportIssueHeader: "Report Issue",
        reportIssueParagraph:
          "Please provide details on the issue you're facing, and which equipment",
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
        documentsHeader: "Documents",
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
      adminLocationsNav: {
        locationsHeader: "Locations",
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
        footer:
          "AlphaVictor® is a registered trademark of Uncoded Limited, a registered company in England and Wales with company number 11435074",
      },
      desktopNav: {
        switchOrganisationAlt: "Switch Organisation",
        AlphaVictorAlt: "AlphaVictor",
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
      imageGallery: {
        removeButton: ">> remove",
        imageAlt: "image",
      },
      appHeader: {
        alphaVictorAlt: "AlphaVictor",
      },
    },
    space: {
      getHelp: {
        answerNode: {
          cancelAskButton: "Cancel and ask again",
        },
        questionNode: {
          AlphaVictorLogoAlt: "AlphaVictor logo",
          articleTemplateDescription:
            "I've found the following article that I think you'll find useful",
          videoTemplateDescription:
            "I've found the following video that I think you'll find useful",
          documentTemplateDescription:
            "I've found the following document that I think you'll find helpful",
          appreciateDetailsDescription:
            "We'd really appreciate some more details - click below to send us an email",
          callDescription:
            "I think it's best you speak to someone - click below to place a call",
        },
      },
      documentsList: {
        viewSpan: ">> view",
      },
      pdfViewer: {
        loadingTemplate: "Loading...",
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
};
