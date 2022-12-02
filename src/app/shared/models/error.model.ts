export interface ErrorModel {
        error:                string;
        exceptionPackageName: string;
        exceptionMessage:     string;
        exceptionCause:       string;
        targetedParameter:    string;
        targetedEntityPk:     string;
        status:               number;
        timestamp:            string;
}
