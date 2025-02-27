<br/>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780157/Personal%20Logo/logo-white_e6fujz.png">
  <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png">
  <img alt="Siam Ahnaf" src="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png" height="auto" width="240">
</picture> 
<br/> <br/>

# @siamf/react-export
A React package that simplifies data exporting and clipboard management. It provides react component for printing documents, exporting data as PDF, Excel, and CSV, as well as copying text and structured data to the clipboard.

<a href="https://www.buymeacoffee.com/siamahnaf" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

- Small Size
- All Export Formate
- Export As PDF
- Export As CSV
- Export As Excel
- Copy table data to Clipboard
- Copy any text to clipboard
- Excel or Sheet to JSON converter

### What's new on version 4.0.5
- Added `onSuccess` and `onError` props to `ExportAsExcel`, `ExportAsPdf`, and `ExportAsCsv` component
- Code optimizations 
- Remove file upload component from this package, Instead I create another package [@siamf/upload](https://www.npmjs.com/package/@siamf/upload) with more functionality and options. See the docs [here](https://www.npmjs.com/package/@siamf/upload)
- Rename the component `ExcelToJsonConverter` to `ExcelToJson`
- Huge API change for `ExcelToJson` component. For more details, read the docs for this component.
- React 19 Support
- Package Update


# Installation

```bash
$ npm i @siamf/react-export
```

```javascript
import { ExportAsExcel, ExportAsPdf, ExportAsCsv, CopyToClipboard, CopyTextToClipboard, PrintDocument, ExcelToJson } from "@siamf/react-export";


//Export as Excel Sheet
<ExportAsExcel
    data={data}
    headers={["Name", "Age", "Something"]}
>
    {(props)=> (
      <button {...props}>
        Export as Excel
      </button>
    )}
</ExportAsExcel>

//Export as pdf
<ExportAsPdf
    data={data}
    headers={["CreatedBy", "Age", "Something Else"]}
    headerStyles={{ fillColor: "red" }}
    title="Sections List"
>
    {(props)=> (
      <button {...props}>
        Export as PDF
      </button>
    )}
</ExportAsPdf>

//Export as CSV
<ExportAsCsv
    data={data}
>
    {(props)=> (
      <button {...props}>Hello World</button>
    )}
</ExportAsCsv>

//Copy to clipboard (Array or Table)
<CopyToClipboard
    data={data}
    headers={["CreatedBy", "Age", "Something Else"]}
>
    {(props)=> (
      <button {...props}>
        Copy Document
      </button>
    )}
</CopyToClipboard>

//Copy to clipboard (text)
<CopyTextToClipboard text="Hello World">
    {(props)=> (
      <button {...props}>
        Copy Text
      </button>
    )}
</CopyTextToClipboard>


//Print data
<PrintDocument
    data={data}
    headers={["CreatedBy", "Age", "Something Else"]}
>
    {(props)=> (
      <button {...props}>
        Copy Text
      </button>
    )}
</PrintDocument>

//Excel to json converter or Read Excel File
<ExcelToJson>
    {({
        isDragging,
        dragProps,
        onFileUpload,
        error,
        data,
        file
    }) => (
        <div {...dragProps} onClick={onFileUpload}>
            Upload Excel File
        </div>
    )}
</ExcelToJson>
```

# Options
## ExportAsExcel

<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Default </th>
  </tr>
  <tr>
    <td> chilren </td>
    <td> ReactNode (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> data </td>
    <td> Array (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> headers </td>
    <td> string[] (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> name </td>
    <td> string (Optional) </td>
    <td> reactExportTable </td>
  </tr>
   <tr>
    <td> minColumnWidth </td>
    <td> number (Optional) </td>
    <td> 15 </td>
  </tr>
  <tr>
    <td> fileName </td>
    <td> string (Optional) </td>
    <td> reactExportTable </td>
  </tr>
  <tr>
    <td> onError </td>
    <td> (error:Error)=>void (Optional) </td>
    <td> </td>
  </tr>
  <tr>
    <td> onSuccess </td>
    <td> ()=>void (Optional) </td>
    <td>  </td>
  </tr>
</table>

## ExportAsPdf

<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Default </th>
  </tr>
  <tr>
    <td> chilren </td>
    <td> ReactNode (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> data </td>
    <td> Array (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> headers </td>
    <td> string[] (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> foot </td>
    <td> string[] (Optional) </td>
    <td> </td>
  </tr>
   <tr>
    <td> title </td>
    <td> string (Optional) </td>
    <td> </td>
  </tr>
  <tr>
    <td> fileName </td>
    <td> string (Optional) </td>
    <td> reactExportTable </td>
  </tr>
   <tr>
    <td> theme </td>
    <td> "striped" | "grid" | "plain" (Optional) </td>
    <td> "grid" </td>
  </tr>
  <tr>
    <td> styles </td>
    <td> StylesDefs (Optional) </td>
    <td> </td>
  </tr>
  <tr>
    <td> headerStyles </td>
    <td> StylesDefs (Optional) </td>
    <td> </td>
  </tr>
  <tr>
    <td> footerStyles </td>
    <td> StylesDefs (Optional) </td>
    <td> </td>
  </tr>
   <tr>
    <td> margin </td>
    <td> Margin (Optional) </td>
    <td> </td>
  </tr>
  <tr>
    <td> orientation </td>
    <td> Orientation (Optional). Format is- "landscape" | "portrait" | "l" | "p" </td>
    <td>  </td>
  </tr>
  <tr>
    <td> onError </td>
    <td> (error:Error)=>void (Optional) </td>
    <td> </td>
  </tr>
  <tr>
    <td> onSuccess </td>
    <td> ()=>void (Optional) </td>
    <td>  </td>
  </tr>
</table>

### StylesDefs
- `font: 'helvetica'|'times'|'courier' = 'helvetica'`
- `fontStyle: 'normal'|'bold'|'italic'|'bolditalic' = 'normal'`
- `overflow: 'linebreak'|'ellipsize'|'visible'|'hidden' = 'linebreak'`
- `fillColor: Color? = null`
- `textColor: Color? = 20`
- `cellWidth: 'auto'|'wrap'|number = 'auto'`
- `minCellWidth: number? = 10`
- `minCellHeight: number = 0`
- `halign: 'left'|'center'|'right' = 'left'`
- `valign: 'top'|'middle'|'bottom' = 'top'`
- `fontSize: number = 10`
- `cellPadding: Padding = 10`
- `lineColor: Color = 10`
- `lineWidth: border = 0` // If 0, no border is drawn

### Margin

- `top: number`
- `right: number`
- `bottom: number`
- `left: number`

### Theme

You find this three type theme-

<img src="https://res.cloudinary.com/dub0dpenl/image/upload/v1682863912/samples_rwolo2.png" alt="Theme"/>


## ExportAsCsv

<table width="100%">
 <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Default </th>
  </tr>
  <tr>
    <td> chilren </td>
    <td> ReactNode (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> data </td>
    <td> Array (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> fileName </td>
    <td> String (Optional) </td>
    <td> Custom CSV File Name </td>
  </tr>
  <tr>
    <td> onError </td>
    <td> (error:Error)=>void (Optional) </td>
    <td> </td>
  </tr>
  <tr>
    <td> onSuccess </td>
    <td> ()=>void (Optional) </td>
    <td>  </td>
  </tr>
</table>

## CopyToClipboard

<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Default </th>
  </tr>
  <tr>
    <td> chilren </td>
    <td> ReactNode (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> data </td>
    <td> Array (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> headers </td>
    <td> string[] (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> onCopied </td>
    <td> Function (Optional) </td>
    <td> When copy will be success </td>
  </tr>
   <tr>
    <td> onFailed </td>
    <td> Funtion (Optional) </td>
    <td> When copy will be failed </td>
  </tr>
</table>

## CopyTextToClipboard

<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Default </th>
  </tr>
  <tr>
    <td> chilren </td>
    <td> ReactNode (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> text </td>
    <td> string (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> headers </td>
    <td> string[] (Required) </td>
    <td> </td>
  </tr>
   <tr>
    <td> onCopied </td>
    <td> Function (Optional) </td>
    <td> When copy will be success </td>
  </tr>
   <tr>
    <td> onFailed </td>
    <td> Funtion (Optional) </td>
    <td> When copy will be failed </td>
  </tr>
</table>


## PrintDocument 

- Same as `ExportAsPdf` Component!

## ExcelToJson

### Props
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Description </th>
    <th> Required/Optional </th>
  </tr>
  <tr>
    <td> onRead </td>
    <td> (data: Array<any>) => void </td>
    <td> For listening converted data </td>
    <td> Required </td>
  </tr>
  <tr>
    <td> value </td>
    <td> Array<any> </td>
    <td> Default Value </td>
    <td> Required </td>
  </tr>
  <tr>
    <td> children </td>
    <td> (props: ExportInterface) => React.ReactNode </td>
    <td> UI for drop zone </td>
    <td> Required </td>
  </tr>
  <tr>
    <td> inputProps </td>
    <td> React.HTMLProps<HTMLInputElement> </td>
    <td> Input Props for input field </td>
    <td> Optional </td>
  </tr>
   <tr>
    <td> onChange </td>
    <td> (file: File | null) => void </td>
    <td> Listener for on file change </td>
    <td> optional </td>
  </tr>
</table>

### Exported Options
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Description </th>
  </tr>
  <tr>
    <td> dragProps </td>
    <td> object </td>
    <td> Native element props for drag and drop feature </td>
  </tr>
   <tr>
    <td> isDragging </td>
    <td> boolean </td>
    <td> For listening is file is dragging on dropzone </td>
  </tr>
   <tr>
    <td> onFileUpload </td>
    <td> () => void </td>
    <td> Called when an element is clicks and triggers to open a file dialog </td>
  </tr>
  <tr>
    <td> data </td>
    <td> Array<any> </td>
    <td> Read or Converted data </td>
  </tr> 
  <tr>
    <td> file </td>
    <td> File | null </td>
    <td> Selected file </td>
  </tr>
  <tr>
    <td> error </td>
    <td> string </td>
    <td> Validation error </td>
  </tr>
</table>

# Stay in touch

- Author - [Siam Ahnaf](https://www.siamahnaf.com/)
- Website - [https://www.siamahnaf.com/](https://www.siamahnaf.com/)
- Github - [https://github.com/siamahnaf](https://github.com/siamahnaf)
