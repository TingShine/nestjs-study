import { SetMetadata } from "@nestjs/common";

export const XML_KEY = "xml"
export const XmlFormat = () => SetMetadata(XML_KEY, true)