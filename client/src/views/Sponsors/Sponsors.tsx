import React, { useRef, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { GridField } from '../../components/Grid';
import GridEdit from '../../components/GridEdit';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import { Sponsor } from '../../types';

function Sponsors() {
    const history = useHistory();
    const { items: sponsors, setSearch, search, loadMore, hasMore, isLoading } = useFetch<Sponsor>(api.getSponsors);
    const fields: GridField[] = [
        { name: 'name', label: 'Name' },
        { name: 'email', label: 'Email' },
    ];

    const loader = useRef(null);

    const loadMoreCallback = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !isLoading) {
                loadMore();
            }
        },
        [loadMore, hasMore, isLoading],
    );

    useEffect(() => {
        const options = {
            root: null, // window by default
            rootMargin: '0px',
            threshold: 0.25,
        };

        // Create observer
        const observer = new IntersectionObserver(loadMoreCallback, options);

        const element = loader.current as any;

        // observer the loader
        if (loader && loader.current) {
            observer.observe(element);
        }

        // clean up on willUnMount
        return () => observer.unobserve(element);
    }, [loader, loadMoreCallback]);

    return (
        <div>
            <Title title="Sponsors" />
            <div className="flex justify-between py-4">
                <div className="flex-1">
                    <Input placeHolder="Search sponsors..." className="w-1/2" value={search} onChange={setSearch} />
                </div>
                <div>
                    <Button label="New Sponsor" onClick={() => history.push('/sponsors-edit/0')} />
                    <Button label="Import Sponsors" onClick={() => history.push('/sponsors-import')} />
                </div>
            </div>
            <GridEdit data={sponsors} fields={fields} editRoute="/sponsors-edit" />
            <div ref={loader}>{hasMore && <div>Loading...</div>}</div>
        </div>
    );
}

export default Sponsors;
