import {Typography, TypographyProps} from '@mui/material';
import dateFormat from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React, {memo, useMemo} from 'react';
import enLocale from 'date-fns/locale/en-US';

type DateProps = TypographyProps & {
    /**
     * The date value to display (Date object, timestamp, or ISO string)
     * @default current date/time when `now` is true
     */
    value?: Date | number | string | null;

    /**
     * Use current date/time when true (overrides `value`)
     * @default false
     */
    now?: boolean;

    /**
     * Custom date format string (uses date-fns format tokens)
     * @default context's defaultFormat or 'PP' (localized date format)
     */
    format?: string;

    /**
     * Display relative time (e.g., "3 days ago") instead of absolute date
     * @default false
     */
    fromNow?: boolean;

    /**
     * Fallback content when date is invalid or not provided
     * @default '-'
     */
    defaultValue?: React.ReactNode;

    /**
     * Add "ago" suffix to relative time (only when fromNow=true)
     * @default true
     */
    includeSuffix?: boolean;

    /**
     * Additional options for relative time formatting
     */
    distanceOptions?: {
        addSuffix?: boolean;
        includeSeconds?: boolean;
        locale?: Locale;
    };

    /**
     * Whether to render as semantic <time> element
     * @default true
     */
    semantic?: boolean;
};

const defaultFormat = 'PP'
const locale = enLocale

const DateValue = ({
                       value = null,
                       now = false,
                       format,
                       fromNow = false,
                       defaultValue = '-',
                       includeSuffix = true,
                       distanceOptions,
                       semantic = true,
                       ...props
                   }: DateProps) => {

    const date = useMemo(() => {
        if (now) {
            return new Date();
        }

        if (!value) {
            return null;
        }

        return typeof value === 'string' ? new Date(value) : new Date(value);
    }, [now, value]);

    const [formattedDate, isoDate] = useMemo(() => {
        if (!date || isNaN(date.getTime())) {
            return [defaultValue, undefined];
        }

        if (fromNow) {
            return [
                formatDistanceToNow(date, {
                    addSuffix: includeSuffix,
                    locale,
                    ...distanceOptions,
                }),
                date.toISOString(),
            ];
        }

        return [dateFormat(date, format || defaultFormat || 'PP', {locale}), date.toISOString()];
    }, [date, fromNow, format, defaultFormat, locale, includeSuffix, distanceOptions, defaultValue]);

    return (
        <Typography
            {...props}
            component={semantic ? 'time' : 'span'}
            dateTime={semantic ? isoDate : undefined}
            title={isoDate ? new Date(isoDate).toLocaleString() : undefined}
        >
            {formattedDate}
        </Typography>
    );
};

export default memo(DateValue);
