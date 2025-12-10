<h1>Dette er min Fagprøve.</h1>

<p>Dette er prosjektet jeg leverte inn til fagprøven for å fullføre min læretid.<br>
Fagprøven varte i 7 virkedager.</p>

<h2>Oppgave Mål:</h2>
<p>Målet med denne oppgaven er å lage en nettside som skal hjelpe en kommunal bedrift med å digitalisere påmelding av kurs. Administrering av kurs og medlemmer skal bli gjort av en kontoransatt fra nettsiden. 
En lærer ansvarlig for et kurs skal ha mulight til å føre fravær og tilstedeværelse på kurstimene </p>


<h2>How to run:</h2>
<p>
  You need a working Supabase project. Just head over to
  <a href="https://supabase.com/">https://supabase.com/</a> and start your project for free.
</p>
<p>You need 2 .env files to run this — one in the frontend root folder and one in the backend root folder:</p>

<h3>root folder /backend/.env</h3>
<p>Values from Supabase:</p>
<pre>
SUPABASE_ANON
SUPABASE_SECRET
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_URL
</pre>
<p>Database connection string (Postgres):</p>
<pre>
DB_CONNECTION_STRING
</pre>

<h3>root folder /frontend/.env</h3>
<p>Your backend API URL stored as a VITE_ environment variable:</p>
<pre>
VITE_BACKEND_API
</pre>
