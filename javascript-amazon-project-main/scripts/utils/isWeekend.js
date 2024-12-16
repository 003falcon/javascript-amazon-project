import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export default function isWeekend(dayjsObject)
{
  // console.log(dayjsObject.format('d'))
  return (dayjsObject.format('d')==0) || (dayjsObject.format('d')==6);

}