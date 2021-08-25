import { InputBase, TextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useGlobalStore } from 'AppStore';

import { CSSProperties, useEffect, useMemo, useState} from 'react';
import { useQuery } from "react-query";
import { useLocation, useParams } from 'react-router';
import { fetchUsers } from "../../api/user";

export type SessionAppBarSearchProps = {
    style?: CSSProperties;
    onSearchTextChange: (searchText?: any) => void;
}

export function SessionAppBarSearch({ style, onSearchTextChange }: SessionAppBarSearchProps) {
    const [searchBarText, setSearchBArText] = useState<string[]>([]);
    const location = useLocation();
    const {search} = useGlobalStore();
    const params = useParams();
    console.log("params",params, search);
    const searchText = search["/session"]
    const { data: users, refetch: reFetchUsers } = useQuery('users', fetchUsers, {
        initialData: []
    });
    

    
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const id = query.get("id");
        if (!id) {return;}
        console.log("id", id, users)
        const filterResults = users.filter((user: any) => {
            return user.id === id
        })

        if (filterResults && filterResults.length <= 0) {
            return;
        }

        if (filterResults && filterResults.length <= 0) {
            return;
        }
        setSearchBArText(filterResults)
        
        
    },[users,location.search])

    useEffect(() => {
        onSearchTextChange(searchBarText);
    },[searchBarText])
    console.log("searchText", searchText);

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option: any) => option.id,
      });
      
    return <Autocomplete
        filterOptions={filterOptions}
        fullWidth={true}
        popupIcon={ null}
        options={users}
        multiple
        value={searchBarText}
        openOnFocus
        getOptionLabel={(option: any) => `${option.givenName} ${option.surname}`}
        onChange={(event, value) => { setSearchBArText(value) }}
        renderInput={({InputProps, ...params}) => <TextField placeholder="search by users" {...params} InputProps={{...InputProps,disableUnderline: true}} style={style} />}

    />
}