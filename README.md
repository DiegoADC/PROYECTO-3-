<h1>Seguimiento de usuarios de Twitch</h1>
<p>Esta solución utiliza el servicio <a href="https://dev.twitch.tv/docs/api/">API Twitch</a> para buscar datos públicos de los usuarios que tu elijas, como sus vistas totales, seguidores y streams, y se muestran en un pagina junto con unas gráficas que muestra los TOPS 10 usuarios mas seguidos y mas vistas que tu hayas elegido, que se generan a partir de la librería <code>Chart.js</code></p>

<hr>

<h2>Instalación </h2>
 <p>Existen unos usuarios por defecto, si los deseas modificar eliminar cambiar o agregar a un usuario, lo puedes hacer en el archivo <code>JSON</code> que contiene la carpeta <code>json</code>, solo tienes que agregar su nombre tal cual como esta en su canal de Twitch, si agregas a alguien mas solo copia todo lo que contiene el <code>ARRAY</code> (streamer, live, viewers, followers), solo modifica el valor “streamer” por el nombre del usuario que quieras agregar</p>
<hr>

<h2>Uso del Proyecto</h2>
<p>Con los usuarios por defecto o que hayas agregado se mostraran en el Front, y se renderizaran en la pantalla, los tiempos de carga dependerá de cuantos usuarios se tengan que buscar</p>
<hr>

<p>¡Déjame saber si surge algún problema! </p>
