import { Button } from "../button";
import { TextField } from "../text-field/text-field"
import classes from "./file-uploader.module.scss";


export type FileUploaderPropsType = {
    className?: string
    label?: string
} 

const FileUploader = ({className, label} : FileUploaderPropsType) => {
    return (
         <TextField name='image' type='file' label={label} />
    )
}

export const ImageUploader = () => {
    return (
        <div className={classes.imageUploader}>
            <Button fullWidth>
                <FileUploader label="Select from Computer" />
            </Button>
        </div>
    )
}