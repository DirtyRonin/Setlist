# Stagehand

## Summary
Stagehand lets you create setlists for your concerts. Songs in a setlist can be filtered by Artist, Title or Genre and are saved within an editable order.

## Live Version
Wanna try the Website ?
The link to the [Live Demo](http://stagehand.dirtyronin.eu/) 

Currently, only user with the roles admin and visitor are supported.
For testing please ***continue as visitor*** 

## Supported Actions

### Songs
 * List of all available songs
 * All ***Crud actions and filtering***

 | Field             | Type   | 
|:------------------|:-------|
| title                | string |
| artist | string |
| originalKey       | string   |
| evergreen     | boolean   |
| nineties            | boolean |
| genre             | string |
| comment            | string |


### Bands
 * List of all *subscribed* bands for the current user
 * All ***Crud actions and filtering*** for ***subscribed bands***

 | Field             | Type   | 
|:------------------|:-------|
| title                | string |


### Locations
 * List of all available locations
 * All ***Crud actions and filtering***

 | Field             | Type   | 
|:------------------|:-------|
| title                | string |
| address                | string |

### Concerts / Custom Event
* List of all concerts for each band the user has *subscribed* to
* All ***Crud actions and filtering*** for ***subscribed bands***
* A concert is defined by ***date, location and band***
* Has only one Setlist

| Field             | Type   | 
|:------------------|:-------|
| date                | Date |
| title                | string |
| location                | Location |
| band                | Band |

### Setlist
* List of all songs aligned with an unique concert / custom event
* All ***Crud actions and filtering*** for ***aligned songs***
* A setlist is unique and bound to a concert / custom event
* Compare setlists
	- If there is at least one concert with the ***same location and band*** and its date is ***before the current one*** 
	- At max the last two concerts prior to the current one
	- List of all songs aligned to the ***current and prior concerts***
	- Songs from a prior setlist can be added with an async button
	- Depending on the current state of a song to the current setlist (existing, missing,adding, failed adding attempt ) the button icon changes dynamically 
	- ![CompareSetlists](https://user-images.githubusercontent.com/35257538/186239110-a8ba0ff0-bdfa-4d96-88aa-832bc294118b.JPG)

As a visitor you can do most of the ***CRUD operations***. Here are some ***restricted permissions and altered behaviour***
 - Songs 
 	+ can only be read
 - Bands
 	+ onDelete, you actually unsubscribe and can not subscribe again
 - Concerts / Custom Events
 	+ you can only select Bands your have already subscribed to

### Used Stack
- React
- Laravel 8
- MariaDB
[Backend Git Repository](https://github.com/DirtyRonin/stageHand_php)

### Used 3rd Party Libs
- typescript
- react
- react-redux
- react-router
- rxjs
- redux-observable
- react-bootstrap
- react-infinite-scroll-component
- axios
- webpack
- styled-components
- fortawesome
- material-ui

***
