import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import  "./TermsAndConditions.module.css"

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="contentWidth">
        <Button
          style={{ marginTop: "20px" }}
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Tilbake
        </Button>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 0" }}>
          <h1>Personvernerklæring</h1>
          <p style={{ color: "#666", marginBottom: "24px" }}>
            Sist oppdatert:  {new Date().toLocaleDateString("no-NB")}
          </p>

          <h2>1. Behandlingsansvarlig</h2>
          <p>
            <strong>[Firmanavn]</strong> er behandlingsansvarlig for behandlingen av
            personopplysninger som beskrevet i denne personvernerklæringen.
          </p>
          <p>
            Kontaktinformasjon: 
            <br />
            Organisasjonsnummer: <strong>[Org. nr]</strong>
            <br />
            Adresse: <strong>[Adresse]</strong>
            <br />
            E-post: <strong>[E-post]</strong>
            <br />
            Telefon: <strong>[Telefon]</strong>
          </p>

          <h2>2. Hvilke personopplysninger vi samler inn</h2>
          <p>Vi samler inn og behandler følgende personopplysninger:</p>
          
          <h3>2.1 For kursdeltakere</h3>
          <ul>
            <li><strong>Navn</strong> – for å identifisere deltakeren</li>
            <li><strong>Telefonnummer</strong> – for kommunikasjon om kurs</li>
            <li><strong>Kurspåmeldinger</strong> – hvilke kurs du er påmeldt</li>
            <li><strong>Oppmøteregistrering</strong> – tilstedeværelse på kurstimer</li>
            <li><strong>Registreringsdato</strong> – når du ble registrert</li>
          </ul>

          <h3>2.2 For ansatte (lærere og kontoransatte)</h3>
          <ul>
            <li><strong>E-postadresse</strong> – for innlogging og kommunikasjon</li>
            <li><strong>Rolle</strong> – for tilgangsstyring i systemet</li>
            <li><strong>Bruker-ID</strong> – teknisk identifikator</li>
          </ul>

          <h2>3. Formål med behandlingen</h2>
          <p>Vi behandler personopplysninger for følgende formål:</p>
          <ul>
            <li><strong>Kursadministrasjon</strong> – påmelding, organisering og gjennomføring av kurs</li>
            <li><strong>Oppmøteregistrering</strong> – føring av tilstedeværelse og fravær</li>
            <li><strong>Kommunikasjon</strong> – informasjon om kursendringer eller avlysninger</li>
            <li><strong>Tilgangsstyring</strong> – sikre at riktige personer har tilgang til riktig informasjon</li>
          </ul>

          <h2>4. Rettslig grunnlag</h2>
          <p>
            Behandlingen av personopplysninger er basert på følgende rettslige grunnlag
            i henhold til personvernforordningen (GDPR):
          </p>
          <ul>
            <li>
              <strong>Samtykke (Art. 6(1)(a))</strong> – Du gir samtykke ved påmelding
              til kurs gjennom å akseptere vilkår og betingelser. 
            </li>
            <li>
              <strong>Oppfyllelse av avtale (Art. 6(1)(b))</strong> – Behandlingen er
              nødvendig for å gjennomføre kursavtalen.
            </li>
            <li>
              <strong>Rettslig forpliktelse (Art. 6(1)(c))</strong> – I noen tilfeller
              kan vi være pålagt å oppbevare dokumentasjon.
            </li>
          </ul>

          <h2>5. Hvem vi deler opplysninger med</h2>
          <p>Vi kan dele personopplysninger med:</p>
          <ul>
            <li>
              <strong>Supabase</strong> – vår leverandør av autentiseringstjenester
              (databehandler). Data lagres sikkert i henhold til GDPR.
            </li>
            <li>
              <strong>Kurslærere</strong> – har tilgang til deltakerlister og
              oppmøteregistrering for kurs de er ansvarlige for.
            </li>
            <li>
              <strong>Kontoransatte</strong> – har tilgang til deltaker- og
              kursinformasjon for administrativt arbeid.
            </li>
          </ul>
          <p>
            Vi selger eller deler ikke personopplysninger med tredjeparter for
            markedsføringsformål. 
          </p>

          <h2>6. Lagring og sletting</h2>
          <p>
            Personopplysninger lagres så lenge det er nødvendig for formålet de ble
            samlet inn for: 
          </p>
          <ul>
            <li>
              <strong>Deltakeropplysninger</strong> – lagres så lenge du er aktiv
              kursdeltaker, og slettes innen 12 måneder etter siste kursaktivitet.
            </li>
            <li>
              <strong>Oppmøtedata</strong> – lagres i inntil 3 år for dokumentasjonsformål.
            </li>
            <li>
              <strong>Brukerkontoer for ansatte</strong> – slettes når ansettelsesforholdet
              opphører.
            </li>
          </ul>

          <h2>7. Dine rettigheter</h2>
          <p>Du har følgende rettigheter i henhold til GDPR:</p>
          <ul>
            <li>
              <strong>Rett til innsyn (Art.  15)</strong> – Du kan be om en kopi av
              alle personopplysninger vi har om deg.
            </li>
            <li>
              <strong>Rett til retting (Art. 16)</strong> – Du kan be om at uriktige
              opplysninger rettes. 
            </li>
            <li>
              <strong>Rett til sletting (Art. 17)</strong> – Du kan be om at dine
              opplysninger slettes ("retten til å bli glemt").
            </li>
            <li>
              <strong>Rett til begrensning (Art. 18)</strong> – Du kan be om at
              behandlingen av dine opplysninger begrenses.
            </li>
            <li>
              <strong>Rett til dataportabilitet (Art.  20)</strong> – Du kan be om
              å få utlevert dine opplysninger i et maskinlesbart format.
            </li>
            <li>
              <strong>Rett til å trekke samtykke</strong> – Du kan når som helst
              trekke tilbake ditt samtykke. 
            </li>
          </ul>
          <p>
            For å utøve dine rettigheter, kontakt oss på <strong>[E-post]</strong>.
            Vi vil svare innen 30 dager.
          </p>

          <h2>8. Informasjonssikkerhet</h2>
          <p>Vi har implementert følgende sikkerhetstiltak:</p>
          <ul>
            <li>Kryptert kommunikasjon (HTTPS/TLS)</li>
            <li>Sikker autentisering via Supabase med JWT-tokens</li>
            <li>Rollebasert tilgangskontroll (RBAC)</li>
            <li>Sikre informasjonskapsler (HttpOnly, Secure)</li>
            <li>Passord lagres aldri i klartekst</li>
          </ul>

          <h2>9. Informasjonskapsler (cookies)</h2>
          <p>Vi bruker følgende informasjonskapsler:</p>
          <ul>
            <li>
              <strong>AccessToken</strong> – Nødvendig for innlogging og
              autentisering.  Utløper etter 60 minutter.  Kategoriseres som
              "nødvendig" og krever ikke samtykke.
            </li>
          </ul>

          <h2>10. Overføring til tredjeland</h2>
          <p>
            Supabase kan lagre data utenfor EU/EØS.  I slike tilfeller sikres
            overføringen gjennom EUs standardavtalevilkår (SCC) eller andre
            godkjente overføringsmekanismer.
          </p>

          <h2>11. Klagerett</h2>
          <p>
            Hvis du mener at vår behandling av personopplysninger ikke er i samsvar
            med GDPR, har du rett til å klage til Datatilsynet: 
          </p>
          <p>
            Datatilsynet
            <br />
            Postboks 458 Sentrum
            <br />
            0105 Oslo
            <br />
            E-post: postkasse@datatilsynet.no
            <br />
            Telefon: 22 39 69 00
            <br />
            Nettside: <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">www.datatilsynet.no</a>
          </p>

          <h2>12. Endringer i personvernerklæringen</h2>
          <p>
            Vi kan oppdatere denne personvernerklæringen ved behov. Ved vesentlige
            endringer vil vi informere deg via e-post eller på nettsiden.  Den til
            enhver tid gjeldende versjonen er tilgjengelig på denne siden.
          </p>

          <h2>13. Kontakt oss</h2>
          <p>
            Har du spørsmål om personvern eller ønsker å utøve dine rettigheter?
            Kontakt oss: 
          </p>
          <p>
            E-post: <strong>[E-post]</strong>
            <br />
            Telefon: <strong>[Telefon]</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;