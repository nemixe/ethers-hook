
export const useMethod = (contract, name) => {
    const [state, setState] = useState();
    const { library } = useWeb3React();

    const setError = (error) =>
        setState({
            success: undefined,
            error,
            isLoading: false,
        });

    const send = useCallback(
        async (...args) => {
            if (!library?.getSigner) return;

            const signerContract = contract.connect(library.getSigner());

            if (!signerContract[name]) return setError('function name invalid');

            setState({
                success: undefined,
                error: undefined,
                isLoading: true,
            });

            return await signerContract[name](...args)
                .then((tx) => {
                    tx.wait().then((res) => {
                        setState({
                            success: {
                                response: res,
                            },
                            error: undefined,
                            isLoading: false,
                        });
                    })
                    return tx;
                })
                .catch((err) => {
                    setError(err.reason);
                    throw err;
                });
        },
        [library, name]
    );

    return {
        send,
        state,
    };
};

export const useCall = (
    contract,
    name,
    args = []
) => {
    const { library } = useWeb3React();
    const [state, setState] = useState({});

    const setError = useCallback((error) =>
        setState({
            value: undefined,
            error,
            isLoading: false,
        }), []);

    useEffect(() => {
        if (!library) return;
        const signerContract = contract.connect(library?.getSigner?.());

        if (!signerContract[name]) return setError('function name invalid');

        setState({
            value: undefined,
            error: undefined,
            isLoading: true,
        });

        signerContract[name](...args)
            .then((res) => {
                setState({
                    value: res,
                    error: undefined,
                    isLoading: false,
                });
                return res;
            })
            .catch((err) => {
                setError(err.reason);
                throw err;
            });
    }, [library, name]);

    return state;
};