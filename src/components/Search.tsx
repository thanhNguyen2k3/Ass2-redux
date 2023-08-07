import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useState } from 'react';
import { useSearchQuery } from '../api/product';
import Box from '@mui/material/Box';

const Search = () => {
    const [searchInput, setSearchInput] = useState<string>('');
    const { data } = useSearchQuery(searchInput);

    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                onChange={(e) => setSearchInput(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
            </IconButton>

            <Box sx={{ backgroundColor: '#fff', width: '100%', position: 'relative' }}>
                {data?.map((product) => (
                    <div className=" absolute top-full flex left-0 right-0 min-h-[200px] shadow-md shadow-slate-800">
                        <img src={product.image} alt="" className="w-10 h-10 rounded" />

                        <p>{product.name?.slice(0, 20)}...</p>
                    </div>
                ))}
            </Box>
        </Paper>
    );
};

export default Search;
