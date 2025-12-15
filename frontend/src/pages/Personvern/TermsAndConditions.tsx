import React from "react";
import { useNavigate } from "react-router-dom";
import  "./TermsAndConditions.module.css"
import { Button } from "../../components/ui/button";

function TermsAndConditions() {
  const navigate = useNavigate();



  return (
    <section>
      <div className="contentWidth">
         <Button
         style={{marginTop:"20px"}}
            variant="outline"
            onClick={() => navigate(-1)}
            >
            Tilbake
        </Button>
           <div>
                <h2>Vilkår og betingelser for kursdeltakelse</h2>

                <h2>1. Generelt</h2>
                <p>
                    Disse vilkårene gjelder for alle kurs arrangert av <strong>[Firmanavn]</strong> (heretter kalt
                    «arrangøren»). Ved påmelding til kurs aksepterer deltakeren disse vilkårene.
                </p>
                <p>
                    Arrangør:
                    <br />
                    Firmanavn: <strong>[Firmanavn]</strong>
                    <br />
                    Organisasjonsnummer: <strong>[Org.nr]</strong>
                    <br />
                    E-post: <strong>[E-post]</strong>
                    <br />
                    Telefon: <strong>[Telefon]</strong>
                </p>

                <h2>2. Påmelding</h2>
                <p>Påmelding til kurs kan skje via nettsiden, eller via telefon til arrangørens kontor.</p>
                <p>Påmelding er bindende når deltakeren er registrert i arrangørens system.</p>
                <p>
                    Ved telefonpåmelding anses vilkårene som akseptert når deltakeren er informert om disse.
                </p>

                <h2>3. Deltakelse og oppmøte</h2>
                <p>Deltakeren er selv ansvarlig for å møte opp til kurs til avtalt tid og sted.</p>
                <p>Manglende oppmøte regnes som gjennomført kursdag og gir ikke rett til refusjon eller erstatning.</p>
                <p>Arrangøren kan føre oversikt over oppmøte og fravær i forbindelse med kursgjennomføring.</p>

                <h2>4. Endringer og avlysning</h2>
                <p>
                    Arrangøren forbeholder seg retten til å endre tidspunkt, sted eller innhold i kurset ved behov.
                </p>
                <p>
                    Arrangøren forbeholder seg også retten til å avlyse kurs ved for få påmeldte, sykdom eller andre
                    uforutsette hendelser.
                </p>
                <p>Ved avlysning fra arrangørens side vil deltakeren bli informert så snart som mulig.</p>

                <h2>5. Ansvar</h2>
                <p>
                    Arrangøren er ikke ansvarlig for tap eller skade som oppstår som følge av forhold utenfor
                    arrangørens kontroll.
                </p>
                <p>Deltakeren er selv ansvarlig for egne eiendeler under kursdeltakelse.</p>

                <h2>6. Personopplysninger</h2>
                <p>
                    Arrangøren behandler personopplysninger i forbindelse med kursadministrasjon, herunder påmelding,
                    deltakelse og oppmøte.
                </p>
                <p>
                    Behandlingen skjer i samsvar med gjeldende personvernlovgivning. Mer informasjon finnes i arrangørens
                    personvernerklæring, tilgjengelig på nettsiden.
                </p>

                <h2>7. Endringer i vilkårene</h2>
                <p>
                    Arrangøren forbeholder seg retten til å endre disse vilkårene. Oppdaterte vilkår vil alltid være
                    tilgjengelig på nettsiden.
                </p>

                <h2>8. Kontakt</h2>
                <p>Spørsmål om kurs eller vilkår kan rettes til:</p>
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

export default TermsAndConditions;
