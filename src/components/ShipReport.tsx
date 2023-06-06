import React, { FC } from 'react'
import html2canvas from 'html2canvas'
import Dialog from './Dialog'
import { Button } from './Button'
import { Printer } from 'lucide-react'
import jsPDF from 'jspdf'
import { useSession } from 'next-auth/react'

interface IProps {
  data: any
  previewReport: boolean
  setPreviewReport: any
}

const ShipReport: FC<IProps> = ({ data, previewReport, setPreviewReport }) => {
  const session = useSession()

  const columns = [
    'No',
    'IMO Number',
    'Name',
    'Type',
    'Flag',
    'GRT',
    'DWT',
    'HP',
    'Call Sign',
    'Year Built',
  ]

  const rowData = data.map((item: any, i: number) => ({
    No: i + 1,
    'IMO Number': item.imoNumber,
    Name: item.name,
    Type: item.type,
    Flag: item.flag,
    GRT: item.grt,
    DWT: item.dwt,
    HP: item.hp,
    'Call Sign': item.callSign,
    'Year Built': item.yearBuilt,
  }))

  const createPDF = async () => {
    const pdf = new jsPDF('portrait', 'pt', 'a4')
    const data = await html2canvas(document.querySelector('#pdf')!)
    const img = data.toDataURL('image/png')
    const imgProperties = pdf.getImageProperties(img)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width
    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('report.pdf')
  }

  return (
    <Dialog open={previewReport} setOpen={setPreviewReport}>
      <div className="mb-5 border">
        <div id="pdf">
          <div className="bg-white p-6 text-slate-900">
            <div className="mb-20 w-3/4 space-y-2 font-bold">
              <p>PT. ALIYAH EST INDONESIA</p>
              <p>
                Jl. Mawar Luar No.20, RT.8/RW.6, Tugu Utara, Kec. Koja, Jakarta
                Utara, Daerah Khusus Ibukota Jakarta 14260
              </p>
              <p>Telp: 021 2243 6996, Fax: 021 2243 7180</p>
              <p>Email: crew@aliyah.co.id</p>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {columns.map((item, i) => (
                    <th className="border pb-4 text-xs" key={i}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowData.map((item: any, i: number) => (
                  <tr key={i}>
                    {columns.map((col, i) => (
                      <td className="border px-4 pb-4 text-xs" key={i}>
                        {item[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-10 font-bold">
              <p className="mb-14">Mengetahui Bagian Administrasi</p>
              <p>{session.data?.user.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-end">
        <Button onClick={createPDF}>
          <Printer className="mr-3" /> Download Report
        </Button>
      </div>
    </Dialog>
  )
}

export default ShipReport
