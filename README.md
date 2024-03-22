# Today in Space Project

## Owners: Hollis Crowder & Beatriz Feo

### Project description:

Today in Space: A one-page newsletter containing three sections:

1. the NASA photo of the day with a button to display a written explanation
2. info about people currently in space
3. a form to get on the mailing list
4. [stretch goal] weather on Mars

### MVP:

THe user will be able to:

1. View the NASA photo of the day, which will display additional info written by a professional astronomer when clicked
2. View info about people currently on the ISS by clicking their names
3. Submit their name and email to a form to be added to the mailing list
4. [stretch goal] Rate the NASA photo of the day by clicking a number of stars out of 5
5. [stretch goal] View Mars weather info
6. [stretch goal] Persist rating and mailing list form submissions to the backend

### JSON Server/API structure:

1. NASA photo of the day and the accompanying written explanation will be fetched from the APOD API
2. Info about people currently in space will be fetched from our own JSON-Server using a db.json file, which will store names, photos, and basic information for people currently on the ISS
3. Users can submit their name and email via a form to get added to the mailing list, which will be stored on our JSON-Server
4. [stretch goal] Weather on Mars will be fetched either from the Insight: Mars Weather Service API or via our JSON-Server, which will contain mocked Mars weather data
