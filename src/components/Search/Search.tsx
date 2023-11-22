import { useEffect, useState } from 'react';

import useDebounce from '@/shared/hooks/useDebounce';
import { TextField } from '@/shared/ui/text-field';
import { PngToIcon } from '@/shared/utils/pngToIcon/PngToIcon';

import s from './Search.module.scss';

type Props = {
    setSearch: (email: string) => void;
};

const Search = (props: Props) => {
    const [rawSearch, setRawSearch] = useState('');
    const debouncedSearch = useDebounce(rawSearch.trim(), 500);

    useEffect(() => {
        props.setSearch(debouncedSearch);
    }, [debouncedSearch]);

    return (
        <div>
            <TextField
                className={s.search}
                type={'search'}
                placeholder={'Search'}
                value={rawSearch}
                onChange={e => setRawSearch(e.currentTarget.value)}
            />
        </div>
    );
};

export default Search;
