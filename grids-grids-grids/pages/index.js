import Grid from './grid';

export default function Home() {
  let sizes = [
    { w: 5, h: 5 },
    { w: 8, h: 5 },
    { w: 10, h: 5 },
    { w: 10, h: 8 },
    { w: 10, h: 5 },
    { w: 10, h: 10 },
    { w: 15, h: 10 },
    { w: 20, h: 10 },
    { w: 25, h: 10 },
    { w: 30, h: 10 },
    { w: 30, h: 15 },
  ]

  return (
    <div className='container flex flex-wrap gap-4'>
      {
        sizes.map((size, i) =>
          <Grid size={size} index={i} key={i}></Grid>
        )
      }
    </div>
  )
}
