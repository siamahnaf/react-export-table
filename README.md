<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780157/Personal%20Logo/logo-white_e6fujz.png">
  <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png">
  <img alt="Siam Ahnaf" src="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png" height="auto" width="240">
</picture>


# React Export Table
A package for for exporting array data or table data as excel sheet, csv, pdf and tools for copied data to clipboard or printing data. By using this package you can you can export table data and print table data or copy to clipboard all in one place.

<a href="https://www.buymeacoffee.com/siamahnaf" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

- Small in Size
- All in one
- Properly Maintained

# Installation

```bash
$ npm i react-export-table
```

```bash
import { ExportAsExcel, ExportAsPdf, ExportAsCsv, CopyToClipboard, CopyTextToClipboard, PrintDocument, ExcelToJsonConverter, FileUpload } from "react-export-table";


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
<ExcelToJsonConverter>
    {({
        isDragging,
        dragProps,
        onFileUpload,
        errors,
        data,
        fileInfo
    }) => (
        <div {...dragProps} onClick={onFileUpload}>
            {errors}
        </div>
    )}
</ExcelToJsonConverter>

//File Upload
<FileUpload acceptType={[".pdf"]}>
    {({
        isDragging,
        dragProps,
        onFileUpload,
        errors,
        fileInfo
    }) => (
        <div className="border border-solid border-red-600 p-8" {...dragProps} onClick={onFileUpload}>
            {errors}
        </div>
    )}
</FileUpload>
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

## ExcelToJsonConverter

### Props
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Description </th>
    <th> Example </th>
  </tr>
  <tr>
    <td> onRead </td>
    <td> Function (Optional) </td>
    <td> For getting json data </td>
    <td> `onRead={(data:YourType)=> console.log(data)}` </td>
  </tr>
   <tr>
    <td> inputProps </td>
    <td> React.HTMLProps<HTMLInputElement> (Optional) </td>
    <td> Input Props for input field </td>
    <td> </td>
  </tr>
   <tr>
    <td> onChange </td>
    <td> Function (Optional) </td>
    <td></td>
    <td>`onChange={(file:File)=> console.log(file)}`</td>
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
    <td> "true" if a file is being dragged </td>
  </tr>
   <tr>
    <td> onFileUpload </td>
    <td> function </td>
    <td> Called when an element is clicks and triggers to open a file dialog </td>
  </tr>
   <tr>
    <td> errors </td>
    <td> string </td>
    <td> Validation Error </td>
  </tr>
   <tr>
    <td> data </td>
    <td> Array<any> </td>
    <td> Read or Converted data </td>
  </tr>
  <tr>
    <td> fileInfo </td>
    <td> object </td>
    <td> Selected file info </td>
  </tr>
</table>

## FileUpload

### Props
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Description </th>
    <th> Example </th>
  </tr>
  <tr>
    <td> acceptType </td>
    <td> Function (Required) </td>
    <td> File Accept Type </td>
    <td> `acceptType={[".pdf"]}` </td>
  </tr>
   <tr>
    <td> inputProps </td>
    <td> React.HTMLProps<HTMLInputElement> (Optional) </td>
    <td> Input Props for input field </td>
    <td> </td>
  </tr>
   <tr>
    <td> onChange </td>
    <td> Function (Optional) </td>
    <td></td>
    <td>`onChange={(file:File)=> console.log(file)}`</td>
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
    <td> "true" if a file is being dragged </td>
  </tr>
   <tr>
    <td> onFileUpload </td>
    <td> function </td>
    <td> Called when an element is clicks and triggers to open a file dialog </td>
  </tr>
   <tr>
    <td> errors </td>
    <td> string </td>
    <td> Validation Error </td>
  </tr>
  <tr>
    <td> fileInfo </td>
    <td> object </td>
    <td> Selected file info </td>
  </tr>
</table>

# Migrate to Version 3
In version 3 I added more headless on each component. I update only `CopyTextToClipboard`, `CopyToClipboard`, `ExportAsCsv`, `ExportAsExcel`, `ExportAsPdf`, `PrintDocument` component.

Update this
```bash
<AnyOfThoseComponent
    data={data}
    headers={["Name", "Age", "Something"]}
>
    <button>
        Export as Excel
    </button>
</AnyOfThoseComponent>
```
to
```bash
<AnyOfThoseComponent
    data={data}
    headers={["Name", "Age", "Something"]}
>
    {(props)=> (
      <button {...props}>
        Export as Excel
      </button>
    )}
</AnyOfThoseComponent>
```

# Stay in touch

- Author - [Siam Ahnaf](https://www.siamahnaf.com/)
- Website - [https://www.siamahnaf.com/](https://www.siamahnaf.com/)
- Twitter - [https://twitter.com/siamahnaf198](https://twitter.com/siamahnaf198)
- Github - [https://github.com/siamahnaf](https://github.com/siamahnaf)
