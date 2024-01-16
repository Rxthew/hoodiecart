# Hoodiecart

## Description

This is the result of a speedrun at building a shopping cart application whilst learning about the .NET ecosystem and Angular. The app is split into an
API which was built in .NET with the Cart on the frontend making calls to read and write information. 

### The homepage

The application starts with a form where the user has to log in to access the store. The authentication system is only cosmetic, in reality the user sends
a POST request. The controller from the API checks the credentials and if they are correct, it sends back a response with the appropriate status code.
If the status code is an OK resposne then the client stores the credentials in session storage. The client then redirects the user to the store to which they have access thereafter. Needless to say if this was an actual authentication system it would involve session cookies and the hashing of credentials or OAuh. 

**The right usernames and passwords are 'John Doe', 'Jane Doe' as usernames and 'johndoe' and 'janedoe' as passwords respectively.** 

### The Store and the Cart

At the store itself there are four fictitious items, all hoodies sourced from [the Platzi Fake Store API](https://fakeapi.platzi.com). All you can do is
add the item to the cart, which automatically redirects you there. At the Cart page, you can add to the amount of items you have or remove from it. You
can also remove the item from the cart completely or clear the whole cart. All these operations send PUT calls to the API after updating the View.

### Models

There are three models at the server level. These are items and users, these share a many-to-many relationship with each other. The junction table 
between them also stores the amount that the user has ordered. A third model dubbed 'CartItem' composes the junction table's 'amount' field to the 
item model. This is used to instantiate a join operation when retrieving a user's items from the cart. 

## My Experience

### Approach

In order to make fast progress whilst also learning I followed some tutorials whilst also referring to the documentation at the same time. The advantage of tutorials
is that you learn by example which is always more intuitive, but the disadvantage is that the tutor is teaching a particular implementation, without knowing the tradeoffs between different approaches you lose a lot of context. This is why I try to refer to documentation and find some alternative methods to the achieving the same task. However, when pressed for time there is less of that. The API, in particular, had me relying a lot on a series of tutorials because the documentation left a lot of gaps. The tradeoffs with prioritising time meant also that I was finding workarounds to problems rather than solving them a lot of the time. I'll be talking about some examples. 

### Code quality

Working for long intensive hours coupled with the uncertainty of new frameworks (the next bug can be just around the corner) meant that the programming's quality suffered. The whole stack should ideally be equipped with error handling, async functionality and better state management. Side effects pollute methods and the single responsibility principle is not adhered to. Since this is a dummy implementation, security was never on the agenda but a decent version of this project would apart from implementing authentication, also take care of CORS. 

The API itself does not cover all the edge cases and is tightly coupled to the client code. This was always going to be the case, but the most avoidable architectural mishap was making separate endpoints for incrementing and decrementing. I realised this as I was planning on implementing a cache to prevent the server being called every time an update was made and instead bunch those updates and make one big call. Updating the amount with a number of your choice
through a single API call is so obvious that not even the worst of circumstances can be used to mitigate responsibility.


### Workarounds

My first workaround was when I was trying to pull the user's data along with their information in the junction table. Since I didn't use proper DTOs or Automapper because I felt that they were too involved for the simple API I was making and I didn't know about them all that well; the compiler was caught in a cycle of references where the user refers to the item in the junction table and then that refers back to the user. I had this problem in a Node environment once, but instead of trying to do something elaborate I thought I needed to be quick so that I made a separate endpoint to pull the data I wanted. The price is an extra hit to the server, which is less than ideal. 

Another workaround was implementing my own naive route guard in Angular without knowing about route guards. I was using `router.navigate` a lot, and I had 
implemented a navigation workflow in the homepage on the initialisation of the component, which takes you to the store if it checks and confirms that you are authenticated. However, to my surprise when I navigate to the cart it takes me back to the store, and after some grokking I figured out that that logic was the culprit. This was near the end so I felt that I didn't have time to learn about proper route guards, so I put the logic away from there and into a subscription of an `onNavigationEnd` event. Basically, the code only runs only once the navigation end event is fired. This is code born out of a lack of understanding of how Angular's routing system functions, but I did learn about one facet of navigation in that an event fires and propagates downward in a capturing phase which is not what I 
expected at all. 

Routing triggers components' lifecycle methods, so I had another problem sharing cart data between the store component and the cart component, and I needed that
data when adding a cart item. I tried to implement a behavioural observer, it didn't work but that was my one and only experiment because it was getting late to ship
so I used `sessionStorage` again. 

### Challenges overcome

Even though I was actively trying to avoid problems, I did challenge myself. I decided not to follow any tutorials to build an Angular form and just followed the new documentaiton. I also used http client and observables instead of staying in my familiar comfort zone of the fetch Web API. The tutorials themseslves also helped me learn abou the repository pattern and also about how Angular projects are structured in terms of services and components. 

My biggest hurdle throughout the whole project was when it came to deploy the API, and that's because most API tutorials and guide show you how to publish just the API and not the database. I had to figure a lot of that stuff on my own and by educated guesses. The issue was that I didn't just need to connect my database I also wanted to seed it through a script just like I did locally. The big problem I had was that there were a lot of articles suggesting changing the settings locally before re-publishing, but I didn't know whether that advice was still applicable. There was no guidance on what Azure does, and when I looked for the settings in the portal I couldn't find them. This was such a waste of time because I had a feeling I shouldn't touch the local settings, I came upon a hint that Azure handled everything itself in production and I worked with that. I did need to change files in the end because I required the connection string to the instance in the Cloud rather than the local one. After re-seeding the database and going through all that, I was not sure of mysef so it was a huge boon for me when it worked. 









