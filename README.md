# gerald-test

https://user-images.githubusercontent.com/8611194/212475346-f37dc0bf-b8f0-407f-8e1f-e79b600b6fc4.mp4

**Some comments**
1. Navigation suggestion

I think is not a good idea to have the implemented navigation, because it cause problems with the navbars.

A better option could be:


    RootStack
     └ Drawer
     |  └ Tabs
     |  |  └ Home
     |  |  └ Contacts
     |  └  Dos
     |  └  Tres
     |
     └ screen1
     └ screen2

2. I add a gesture handler to manage the animation, you can swipe to open the drawer and the screen will follow your finger.
3. I created a custom navigator to keep the navigation state coordinated with the custom components. This is really important because now react-navigation can handle the drawer, and you can add deep-linking to these screens in the future.
