import eventsData from '../data/events.json';
import merchandiseData from '../data/merchandise.json';

export const getEvents = () => {
  return eventsData.events;
};

export const getMerchandise = () => {
  return merchandiseData.merchandise;
};

export const getMerchandiseByEvent = (eventId) => {
  try {
    // Convert event ID to number and handle string IDs
    const parsedEventId = Number(eventId);
    
    // Validate event ID
    if (isNaN(parsedEventId) || parsedEventId <= 0) {
      console.error('Invalid event ID:', eventId);
      return [];
    }

    // Get merchandise for the event
    const eventMerch = merchandiseData.merchandise.filter(item => 
      item.event_id === parsedEventId
    );

    // Log for debugging
    console.log('Filtered merchandise for event ID:', parsedEventId, eventMerch);
    
    // Return empty array if no merchandise found
    if (!eventMerch || eventMerch.length === 0) {
      console.log('No merchandise found for event ID:', parsedEventId);
      return [];
    }

    return eventMerch;
  } catch (error) {
    console.error('Error getting merchandise:', error);
    return [];
  }
};
