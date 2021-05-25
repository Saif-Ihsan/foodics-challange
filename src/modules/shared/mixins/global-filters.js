




export default {
    methods:{
        date(value) {
            if (!value) {
                return 'N/A';
            } else {
                const date = new Date (value+' UTC');
                if (date.toString() !== 'Invalid Date') {
                    let day = date.getDate();
                    let month = date.toLocaleString('default', { month: 'short' });
                    let year =date.getFullYear();
                    return `${month}, ${day}-${year}`;
            } else {
                return 'N/A';
            }
            }
        },
        getTime(value) {
          if (!value) {
            return 'N/A';
          } else {
              const date = new Date (value+' UTC');
              if (date.toString() !== 'Invalid Date') {
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds =  date.getSeconds();
                const ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                seconds = seconds < 10 ? '0'+seconds : seconds;
                const strTime = hours + ':' + minutes + ':' +seconds+ ' ' + ampm;
                return strTime;
          } else {
              return 'N/A';
          }
          }
        }
    }    
};
