/**
 * Utility to get formatted Islamic (Hijri) date
 */
export const getHijriDate = () => {
  try {
    const today = new Date();
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      calendar: 'islamic-uma', // UMA is common for Saudi/India
    };
    
    // Format to Arabic/English
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-uma-nu-latn', options);
    const parts = formatter.formatToParts(today);
    
    // Extract parts for custom display
    const day = parts.find(p => p.type === 'day')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const year = parts.find(p => p.type === 'year')?.value;
    
    return {
      full: `${day} ${month}, ${year} AH`,
      day,
      month,
      year,
      raw: formatter.format(today)
    };
  } catch (e) {
    // Fallback if Intl is not supported
    return { full: 'Ramadan 1447 AH', day: '15', month: 'Ramadan', year: '1447' };
  }
};
