## Wreckless Wireframe

This demo is ideally viewed in the Chrome browser, using an emulator for a mobile device (iPhone 5 is recommended).

----

## Preface

Let it be made clear that this document is subject to changes based on client requirements. 

The mockup is intended to serve as a wireframe, and is not representative of the final design. It merely showcases functionality and relationships between pages.

The core functionality described within will stay consistent, but small add-on features may be requested in the coming days. 

It is understood that this may affect estimates and deadlines. What we are trying to do is scope the project as accurately as possible given the information available to us.

-----

## App Functionality 


### Overview

Wreckless is an SMS-based answering machine, similar to an email auto-responder. Responses may come in the form of image macros or videos (hereafter "memes"), chosen at random from a pool on the user's phone.

Wreckless was imagined as a way to fight distracted driving. Users can rest assured that their contacts are aware of their situation, and the recepients of the automated message are treated to a funny picture. 


### Wreckless Mode

When open, the application will not do anything until it is put into "wreckless mode". This is done by tapping a button that toggles this state. 

When wreckless mode is active, all incoming text messages will receive an automated reply from the user's phone. This reply will be an image or GIF format.

When wreckless mode is active, we the application will do one of two things (the client has yet to decide):

- 1) cycle through memes found in the user's library
- 2) play a video in the background (loaded with the application)

When the user exits wreckless mode, they will be presented with a screen that tallies the messages received while in wreckless mode, as well a link to open their messenger application and reply to the messages.

The application will not do anything once wreckless mode is turned off.


### Meme Management

The heart of the messenger will be a pool of memes located on the user's phone. When users first download the application, they will not have any memes circulating in their pool. 

Users may add to the meme pool by selecting from a list of pre-made memes (available on a server), or creating their own (custom memes). 

Custom memes may use a template from a library, a photograph from the user's photo library, or a photograph taken on the spot.

Users may delete memes once they have been created. This removes them from the user's roster. 


### Image Editing

Very basic image editing would be required if the user chooses to snap a photo of something and turn it into a meme. We are looking at a crop function, a rotate function, and perhaps some basic filters. The filters are a nice-to-have, and not required for the initial build.


### Meme Circulation

By default, each meme that the user creates will circulate as an auto-response. If a contact texts the user while wreckless mode is activated, the contact will receive a meme chosen at random from the meme pool.

It should be possible to remove a meme from circulating as an auto-reply without deleting it. Each meme will have an "active" state, represented by a checkmark in the lower right hand corner of its thumbnail. If the user taps the checkmark, it will turn into a an X, indicating that the image is NOT going to be sent to contacts.


### Social Features

It should be possible to share a meme through social media. At the very least facebook, twitter, instagram, sms, and email. Other social media (instagram, flickr) are nice to have, but not required.

Memes shared through social media will feature a watermark with the Wreckless logo, and perhaps a tiny url to download the app.

It should also be possible to recommend the application to a friend through the same channels.


### Points System

We want to reward users for activating the application. The more that people use the application, the more points they will get.

The exact mechanism for rewarding users is still under discussion. We would like to minimize the exploitation of the app through abuse or bots, which would skew the odds of winning in favor of individuals abusing the system. 

Perhaps implementing a cap on the number of point that may be received in one day is a solution. We are open to ideas on this feature.


### Rewards System

Points will be redeemable for prizes. 

We imagine that the application would pull a list of available prizes from a server (allowing the client to periodically update prizes), and display them for the user.

The client will form strategic partnerships with sponsors that will put the prizes forward. Sponsors will allow users of the application to redeem their points for prizes at participating locations. For this reason, it is critical that the points system is as abuse-resistant as possible. 


### Advertising

Prizes and contests will be promoted on a page within the application. We will also require a few of the screens to feature "ad space" that promotes contests and other initiatives on behalf of the client.

Ideally, these ads would be pulled from a server, allowing the client to update them periodically.

Ad space could be used to promote other interests in the future, and should allow us to target users based on interest, geo-location, etc. This would be a nice-to-have, and is not critical to the application for the first phase. 


### Automation

Some users may want Wreckless to start up automatically, as opposed to manually activating the application each time they get behind the wheel. 

Because a user may be travelling above a certain speed as a passenger in a vehicle, there must be some prompt to override the application. Otherwise, messages would be blocked for people riding the bus, who are certainly not distracted.

It is *extremely* dangerous (read stupid) for an application aimed at preventing distractions to ask users if they are driving, or a passenger in a vehicle. Therefore, the automated mode will be opt-out. 

If (and only if) the user enables automation, the application will detect if the user is moving over a certain speed, the application will prompt the user that they are travelling over X km/h, and ask if they are a passenger on a vehicle. If no action is taken within 30 seconds, Wreckless will automatically activate "wreckless mode" and begin responding to messages.


### Info Pages

The application will feature a number of text-based info pages. 

Examples include:

- about this app
- terms and conditions
- privacy policy


### Reporting

It is very important to the client's campaign that they have some sort of statistics/reporting from the application. 

At the very least, knowing: 
- the grand total of messages sent, 
- the average messages sent per user, 
- average points per user, 
- top 10 in each category

Would be great to know. More advanced analytics would be appreciated but are not necessary.


-----

## Possible Expansion(s)

These features are not required for the initial build, but are nice-to-have in the event that the client asks for them. They may certainly be included on a future build.


### Multiple States

Users may require an automated response for when they are in meetings, sleeping, eating, etc. This feature would enable the user to activate a "state" (ex "I'm eating"), and the auto-reply would adjust memes accordingly.

Each state would have its own pool of memes. Only one state may be active at one time. Activating "I am available" would deactivate all other states.

