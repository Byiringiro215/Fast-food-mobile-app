import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import dummyData from "./data";

interface UseLocalDataOptions<T, P extends Record<string, string | number>> {
    fn: (params: P) => T;
    params?: P;
    skip?: boolean;
}

interface UseLocalDataReturn<T, P> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: (newParams?: P) => void;
}

const useLocalData = <T, P extends Record<string, string | number>>({
    fn,
    params = {} as P,
    skip = false,
}: UseLocalDataOptions<T, P>): UseLocalDataReturn<T, P> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!skip);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(
        (fetchParams: P) => {
            setLoading(true);
            setError(null);
            try {
                const result = fn({ ...fetchParams });
                setData(result);
            } catch (err: unknown) {
                const errorMessage =
                    err instanceof Error ? err.message : "An unknown error occurred";
                setError(errorMessage);
                Alert.alert("Error", errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [fn]
    );

    useEffect(() => {
        if (!skip) {
            fetchData(params);
        }
    }, []);

    const refetch = (newParams?: P) => fetchData(newParams!);

    return { data, loading, error, refetch };
};

// Example data accessors for use with this hook
export function getLocalMenu({ category, query, limit }: { category?: string; query?: string; limit?: string }) {
    let items = dummyData.menu;
    if (category) items = items.filter(item => item.category_name === category);
    if (query) items = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    if (limit) items = items.slice(0, Number(limit));
    return items;
}

export function getLocalCategories() {
    return dummyData.categories;
}

export default useLocalData; 