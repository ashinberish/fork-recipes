import { useTranslation } from 'react-i18next';

export default function Feeds() {
  const { t } = useTranslation();

  return <>{t('feeds')}</>;
}
