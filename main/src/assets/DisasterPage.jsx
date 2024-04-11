import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DisasterPage.css'; 
const DisasterPage = () => {
  const { id } = useParams();
  const [disaster, setDisaster] = useState(null);

  useEffect(() => {
    const fetchDisasterData = async () => {
      try {
        // Replace this with your actual data fetching logic
        // For example, you could use an API call or access a local data source
        const disasterData = await getDisasterData(id);
        setDisaster(disasterData);
      } catch (error) {
        console.error('Error fetching disaster data:', error);
      }
    };
    fetchDisasterData();
  }, [id]);

  const getDisasterData = async (disasterId) => {
    // Replace this with your actual data fetching logic
    switch (disasterId) {
      case '1':
        return {
          id: '1',
          name: 'Earthquake',
          description: 'A powerful earthquake struck the region, causing significant damage and loss of life.',
          list: [
            'Drop to the ground, take cover under a sturdy piece of furniture, and hold on until shaking stops.',
            'If outside, move to an open area away from buildings, trees, streetlights, and utility wires.',
            'If trapped, conserve energy and tap on a pipe or wall to alert rescuers of your location.',
            'Check for injuries and administer first aid if needed.',
            'Assist with search and rescue efforts if safe to do so.',
            'Provide emotional support and reassurance.',
          ],
     
          image: '/src/Images/Earthquake.jpg',
        };
      case '2':
        return {
          id: '2',
          name: 'Flood',
          description: 'Heavy rainfall caused severe flooding in the affected areas.',
          list: [
            'Evacuate to higher ground if instructed by authorities.',
            'Avoid walking or driving through flooded areas.',
            'Turn off utilities if instructed to do so and disconnect electrical appliances.',
            'Rescue individuals trapped by floodwaters if it can be done safely.',
            'Provide temporary shelter, dry clothing, and blankets to those affected.',
            'Help clean up and disinfect flooded areas to prevent mold and contamination.rovide emotional support and reassurance.',
          ],
          image: '/src/Images/Flood.jpg',
        };
        case '3':
          return {
            id: '3',
            name: 'Wildfire',
            description: 'A wildfire has broken out in the area, posing a threat to life and property.',
            list: [
              'Evacuate immediately if instructed to do so.',
              'Close all windows and doors to prevent embers from entering the home.',
              'Prepare to defend property by clearing flammable materials away from buildings.',
              'Offer temporary shelter to those displaced by the wildfire.',
              'Provide food, water, and basic necessities to evacuees.',
              'Support efforts to rebuild and recover from the wildfire\'s impact.',
            ],
            image: '/src/Images/Wildfire.jpg',
          };
      case '4':
        return {
          id: '4',
          name: 'Tornado',
          description: 'A violently rotating column of air touching the ground, usually attached to the base of a thunderstorm.',
          list: [
            'Seek shelter in a sturdy building, preferably in a basement or interior room without windows.',
            'If caught outside, lie flat in a low-lying area and cover your head with your hands.',
            'Stay informed about tornado warnings and watches issued by local authorities.',
            'Check for injuries and administer first aid as needed.',
            'Assist with search and rescue operations if safe to do so.',
            'Provide emotional support and help with recovery efforts.',
          ],
          image: '/src/Images/Tornado.jpg',
        };
      
        case '5':
          return {
            id: '5',
            name: 'Hurricane',
            description: 'A hurricane is approaching the area, bringing strong winds, heavy rain, and potential flooding.',
            list: [
              'Evacuate if advised to do so by local authorities.',
              'Stay indoors and away from windows, preferably in a small interior room or hallway on the lowest floor.',
              'Listen to weather updates and follow instructions from emergency officials.',
              'Check for injuries and provide first aid as necessary.',
              'Assist with clearing debris and securing property if safe.',
              'Offer shelter, food, and water to those displaced by the hurricane.',
            ],
            image: '/src/Images/Hurricane.jpg',
          };  

          case '6':
            return {
              id: '6',
              name: 'Volcanic Eruption',
              description: 'A volcanic eruption has occurred, emitting ash and posing risks to nearby communities.',
              list: [
                'Evacuate if you\'re in the vicinity of the eruption, following designated evacuation routes.',
                'Protect yourself from falling ash by staying indoors, if possible, and wearing masks.',
                'Listen to updates and warnings from local authorities.',
                'Provide shelter and assistance to those evacuated from affected areas.',
                'Offer medical care for respiratory issues or injuries caused by volcanic activity.',
                'Support cleanup efforts and help with the restoration of affected communities.',
              ],
              image: '/src/Images/Volcano.jpg',
            };

            case '7':
              return {
                id: '7',
                name: 'Tsunami',
                description: 'Tsunamis are giant waves caused by earthquakes or volcanic eruptions under the sea.',
                list: [
                  'Move to higher ground immediately if you\'re in a coastal area and feel shaking from an earthquake.',
                  'Follow evacuation routes and directions from local authorities.',
                  'Avoid coastal areas until an "all-clear" is given.',
                  'Provide medical assistance to injured individuals.',
                  'Offer temporary shelter and basic necessities to those displaced by the tsunami.',
                  'Assist with search and rescue efforts as needed.',
                ],
                image: '/src/Images/Tsunami.webp',
              };
      // Add more cases for different disaster IDs
      default:
        return null;
    }
  };

  if (!disaster) {
    return <div>Loading...</div>;
  }

  return (
    <div className='disaster-scro'>
    <div className='disaster-sm'>
    <h2 className='disaster-di'>{disaster.name}</h2>
      
      <img src={disaster.image} alt={disaster.name} className='disaster-img'  />
      {/* <p>{disaster.description}</p> */}
      <h3 className='disaster-tqw'>Instructions</h3>
      <ol className='disaster-fd'>
            {disaster.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
      {/* Add more disaster details here */}
      </div>
    </div>
  );
};

export default DisasterPage;