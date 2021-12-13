export function playerScript() {
  const html = `
    <!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width," />
    <style>
      * {
        margin: 0;
      }
      .container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
      }
      #player {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div id="player"></div>
    </div>
    <script src="https://player.vimeo.com/api/player.js"></script>
    <script>
      const options = {
        id: 59777392,
        width: 640,
        loop: true,
      }

      const player = new Vimeo.Player('player', options)

      player.setVolume(0)

      player.on('play', function () {
        console.log('played the video!')
      })
    </script>
  </body>
</html>
    `
  return html
}