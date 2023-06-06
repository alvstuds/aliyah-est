import { FC } from "react";
import InputDate from "../fields/InputDate";
import InputText from "../fields/InputText";
import InputDocument from "../fields/InputDocument";

interface DocumentFormProps {
  prefix?: string;
  num?: number;
  edit?: boolean;
  withType?: boolean;
}

const DocumentForm: FC<DocumentFormProps> = ({
  prefix,
  num,
  edit,
  withType,
}) => {
  return (
    <div className="space-y-3">
      {withType && (
        <InputText
          name={edit ? "type" : `${prefix}_${num}_type`}
          label="Type"
        />
      )}
      <InputText
        name={edit ? "number" : `${prefix}_${num}_number`}
        label="Number"
      />
      <div className="grid gap-3 md:grid-cols-2">
        <InputDate
          name={edit ? "issued" : `${prefix}_${num}_issued`}
          label="Issued"
        />
        <InputDate
          name={edit ? "expired" : `${prefix}_${num}_expired`}
          label="Expired"
        />
      </div>
      <InputText
        name={edit ? "placeOfIssued" : `${prefix}_${num}_placeOfIssued`}
        label="Place of Issued"
      />
      <InputText name={edit ? "name" : `${prefix}_${num}_name`} label="Name" />
      <InputText
        name={edit ? "surName" : `${prefix}_${num}_surName`}
        label="Surname"
      />
      <InputDocument
        name={edit ? "file" : `${prefix}_${num}_file`}
        label="File"
      />
    </div>
  );
};

export default DocumentForm;
