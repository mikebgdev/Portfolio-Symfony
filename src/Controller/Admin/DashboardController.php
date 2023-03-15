<?php

namespace App\Controller\Admin;

use App\Entity\Project;
use App\Entity\Skill;
use Doctrine\Persistence\ManagerRegistry;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\UX\Chartjs\Builder\ChartBuilderInterface;
use Symfony\UX\Chartjs\Model\Chart;

class DashboardController extends AbstractDashboardController
{
    private ChartBuilderInterface $chartBuilder;
    private ManagerRegistry $doctrine;

    /**
     * @param ChartBuilderInterface $chartBuilder
     */
    public function __construct(ChartBuilderInterface $chartBuilder, ManagerRegistry $doctrine)
    {
        $this->chartBuilder = $chartBuilder;
        $this->doctrine = $doctrine;
    }


    public function index(): Response
    {
        $chart = $this->chartBuilder->createChart(Chart::TYPE_BAR);

        $repository = $this->doctrine->getRepository(Skill::class);
        $countSkills = $repository->count([]);
        $repository = $this->doctrine->getRepository(Project::class);
        $countProjects = $repository->count([]);

        $chart->setData([
            'labels' => ['My Stats'],
            'datasets' => [
                [
                    'label' =>'Skills',
                    'borderColor' => 'green',
                    'backgroundColor' => 'green',
                    'data' =>  [$countSkills]
                ],
                [
                    'label' =>'Projects',
                    'borderColor' => 'blue',
                    'backgroundColor' => 'blue',
                    'data' =>  [$countProjects]
                ],
            ],
        ]);

        return $this->render('admin/my-dashboard.html.twig', [
            'chart' => $chart,
        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Portfolio Symfony')
            ->setFaviconPath('icon-dev-logo.png');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Projects', 'fas fa-desktop', Project::class);
        yield MenuItem::linkToCrud('Skills', 'fas fa-skill', Skill::class);
    }
}
