
import { setBanner } from '@/lib/redux/banners.Slice';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';

export const useBanners = () => {
  const dispatch = useDispatch<AppDispatch>();
  const banners = useSelector((state: RootState) => state.banners.banners);
  const { categories } = useSelector((state: RootState) => state.banners);
  const loading = useSelector((state: RootState) => state.products.loading); // Get the loading state
  const selectedBanner = useSelector((state: RootState) =>
    state.banners.banners.find(banner => banner.id === state.banners.selectedBannerId)
  );

  const selectBanner = (bannerId: number) => {
    const banner = banners.find(b => b.id === bannerId);
    if (banner) {
      dispatch(setBanner(banner));
    }
  };

    return { banners, selectedBanner,categories, selectBanner, loading }; 
};
export const useAppDispatch = () => useDispatch<AppDispatch>();