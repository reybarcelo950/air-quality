import {INTERVALS, OPERATORS} from "../interfaces/values.types";
import {capitalize} from "../utils";
import {ColumnTable} from "../components/DataTable";

export const VALUES_KEY_LABELS: Record<string, { label: string, icon?: any }> = {
    CO: {
        label: "CO(GT)"
    },
    PT08S1: {
        label: "PT08.S1(CO)"
    },
    NMHC: {
        label: "NMHC(GT)"
    },
    C6H6: {
        label: "C6H6(GT)"
    },
    PT08S2: {
        label: "PT08.S2(NMHC)"
    },
    NOx: {
        label: "NOx(GT)"
    },
    PT08S3: {
        label: "PT08.S3(NOx)"
    },
    NO2: {
        label: "NO2(GT)"
    },
    PT08S4: {
        label: "PT08.S4(NO2)"
    },
    PT08S5: {
        label: "PT08.S5(O3)"
    },
    T: {
        label: "T"
    },
    RH: {
        label: "RH"
    },
    AH: {
        label: "AH"
    }
};

export const INTERVAL_OPTIONS: { value: INTERVALS; label: string }[] =
    Object.values(INTERVALS).map((interval) => ({
        value: interval,
        label: capitalize(interval),
    }));

export const OPERATOR_OPTIONS: { value: OPERATORS; label: string }[] =
    Object.values(OPERATORS).map((interval) => ({
        value: interval,
        label: capitalize(interval),
    }));

export const PARAMETERS_OPTIONS: { value: string; label: string }[] =
    Object.keys(VALUES_KEY_LABELS).map((key) => ({
        value: key,
        label: VALUES_KEY_LABELS[key].label
    }))

export const OPERATOR_OPTION_HELP: Record<OPERATORS, string> = {
    [OPERATORS.AVG]: "Arithmetic mean of the specified numeric field across all documents",
    [OPERATORS.MIN]: "Smallest (minimum) value of the specified field in the group of documents",
    [OPERATORS.MAX]: "Largest (maximum) value of the specified field in the group of documents",
}

export const TABLE_COLUMNS: ColumnTable[] =
    Object.keys(VALUES_KEY_LABELS).map((key) => ({
        field: key,
        align: "center",
        headerName: VALUES_KEY_LABELS[key].label
    }))

export const TABLE_ROWS_PER_PAGE = 10;
