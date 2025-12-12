import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../../components/ui/table"

function Kontoransatt() {
  return (
    <section>
      <div className="contentWidth">
        <h1>Kontoransatt side</h1>

        <Table>
          <TableCaption>Oversikt over lærere</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Navn</TableHead>
              <TableHead>Fag</TableHead>
              <TableHead className="text-right">År</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ola Nordmann</TableCell>
              <TableCell>Matematikk</TableCell>
              <TableCell className="text-right">2025</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kari Nordmann</TableCell>
              <TableCell>Engelsk</TableCell>
              <TableCell className="text-right">2024</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Kontoransatt
